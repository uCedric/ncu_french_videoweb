import express from "express";
import bcrypt from "bcrypt";

import { getUserByEmail,updateUserById,updateUserById_favorite_post,updateUserById_favorite_video } from "../model/user";

export const update =async (req: express.Request, res: express.Response) => {
    try{
        const {username,password} = req.body;
        const email = req.header.toString();
        const user = await getUserByEmail(email);
        //確認是否有此使用者
        if(!user){
            return res.status(400).json("User not exists");
        }
        //密碼雜湊加密
        const hashedpassword = await bcrypt.hash(password,10);
        //更新資料庫
        const storeUser = await updateUserById(user._id.toString(),{username,hashedpassword});
        return res.status(200).json("success !!!").end();
    }catch{
        return res.status(400).json("Error");
    }
}

export const update_favorite_post = async (req: express.Request, res: express.Response) => {
    try{
        const {post_id} = req.params;
        const email = req.header.toString();
        //新增收藏文章
        const user = await getUserByEmail(email);
        if(user){
            const storeUser = await updateUserById_favorite_post(user._id.toString(),{post_id});
        }
        return res.status(200).json("success !!!").end();
    }catch{
        return res.status(400).json("Error");
    }
};

export const update_favorite_video = async (req: express.Request, res: express.Response) => {
    try{
        const {video_id} = req.params;
        const email = req.header.toString();
        //新增收藏文章
        const user = await getUserByEmail(email);
        if(user){
            const storeUser = await updateUserById_favorite_video(user._id.toString(),{video_id});
        }
        return res.status(200).json("success !!!").end();
    }catch{
        return res.status(400).json("Error");
    }
};