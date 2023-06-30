import express from 'express';

import {createVideo,getVideoById,getVideos,updateVideoById} from '../model/video';

export const user_get_all_Video =async (req: express.Request, res: express.Response) => {
    try{
        const result = await getVideos();
        if(!result){
            return res.status(400).send({message:"No videos found"});
        }
        return res.status(200).send({message:"Videos fetched successfully",result});
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