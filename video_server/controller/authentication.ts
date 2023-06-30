import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {getUserByEmail, createUser} from "../model/user";

export const register =async (req: express.Request, res: express.Response) => {
    try{
        const {email, password, username} = req.body;
        //檢查是否有空值
        if(!email || !password || !username){
            return res.status(400).json("Missing fields");
        }
        //檢查信箱格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!email.match(emailRegex)){
            return res.status(400).json("Invalid email format");
        }
        //檢查是否已經註冊過
        const existingUser =await getUserByEmail(email);
        if(existingUser){
            return res.status(400).json("User already exists");
        }
        //密碼雜湊加密
        const hashedpassword = await bcrypt.hash(password,10);
        //存入資料庫
        const storeUser = await createUser({email,username,hashedpassword});

        return res.status(200).json(storeUser).end();
    }catch{
        return res.status(400).json("Error");
    }
};

export const login = async (req: express.Request, res: express.Response) => {
    try{
        const {email, password} = req.body;
        //檢查是否有空值
        if(!email || !password){
            return res.status(400).json("Missing fields");
        }
         //檢查信箱格式
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if(!email.match(emailRegex)){
             return res.status(400).json("Invalid email format");
         }
        //找出此email的使用者
        const user = await getUserByEmail(email);
        if(!user){
            return res.status(400).json("User not exists");
        }else{
            //檢查密碼是否正確
            const match = await bcrypt.compare(password,user.hashedpassword);
            if(!match){
                return res.status(400).json("Wrong password");
            }
        }
        //建立token
        const SECRET_KEY="fr_videoweb"
        const token = jwt.sign({email:email},SECRET_KEY,{ expiresIn: '1 day' });
        return res.status(200).json(token).end();

    }catch{
        return res.status(400).json("Error");
    }
};