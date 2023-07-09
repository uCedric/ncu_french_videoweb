import express from 'express';
import { redisConnection } from './redis_updatecache';
import redis from "redis";
import fs from 'fs';
import path from 'path';

import {createVideo,getVideoById,getVideos,updateVideoById} from '../model/video';
import video from '../router/video';

export const user_get_all_Video =async (req: express.Request, res: express.Response) => {
    try{
        
        const data = await getVideos();
        if(!data){
            return res.status(400).send({message:"No videos found"});
        } 
        redisConnection(Object.entries(data));
        //client.setEx("videos",3600,JSON.stringify(result));
        return res.status(200).json(data);
    }catch{
        return res.status(400).send({message:"Bad Request"});
    }
};

export const add_new_video =async (req: express.Request, res: express.Response) => {
    try{
        const {title,description,url,date} = req.body;
        const views=0;
        const owneremail = req.header.toString();
        if(!owneremail || !title || !description || !url || !date){
            return res.status(400).send({message:"please fill all the fields"});
        }
        const result = await createVideo({owneremail,title,description,url,views,date});
        return res.status(200).send({message:"Video added successfully",result});
    }catch{
        return res.status(400).send({message:"Bad Request"});
    }
};

export const update_video =async (req: express.Request, res: express.Response) => {
    try{
        const {title,description,url,views} = req.body;
        const {video_id} = req.params;
        const ownervideo = await getVideoById(video_id);
        const owneremail = req.header.toString();
        if(ownervideo?.owneremail!=owneremail){
            return res.status(401).send({message:"you are not the owner of this video !"})
        }
        const result = await updateVideoById(video_id,{owneremail,title,description,url,views});
        return res.status(200).send({message:"Video updated successfully",result});
    }catch{
        return res.status(400).send({message:"Bad Request"});
    }
};

export const video_stream =async (req:express.Request,res:express.Response) => {
    try{
        const {video_id} = req.params;
        const videoPath = "./videos/"+video_id+".mp4";
        const videoSize =  fs.statSync(videoPath).size;
        console.log(videoSize);
        const range = req.headers.range;
        if(!range){
            return res.status(400).send({message:"Range header not found"});
        }
        const CHUNK_SIZE = 10 ** 6;
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,    
            "Content-Type": "video/mp4",    
        };
        res.writeHead(206, headers);

        const videoStream = fs.createReadStream(videoPath, { start, end });
        videoStream.pipe(res);
        /*if(!result){
            return res.status(400).send({message:"No video found"});
        }*/
    }catch(err){
        return res.status(400).send({message:"Bad Request???",err});
    }
};