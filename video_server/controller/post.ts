import express from "express";
import { createPost } from "../model/post";

export const add_new_post = async (req: express.Request, res: express.Response) => {
    try{
        const {title,content} = req.body;
        const owneremail = req.header.toString();
        const created_at = new Date();
        //新增文章
        const storePost = await createPost({owneremail,title,content,created_at});
    }catch{
        return res.status(400).json("Error");
    }
};