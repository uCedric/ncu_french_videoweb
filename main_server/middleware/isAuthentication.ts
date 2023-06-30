import express from "express";
import jwt from "jsonwebtoken";
import {getUserByEmail} from "../model/user";

export const isAuthentication =async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const SECRET_KEY="fr_videoweb";
        const token = req.header('auth')?.toString().split(' ')[1];

        if(!token){
            return res.status(401).json("token not found");
        }else{
            //jwt驗證
            jwt.verify(token, SECRET_KEY,(err,payload)=>{
                if(err){
                    return res.status(401).json(err);
                }else{
                    //增加email訊息至header讓後面的路由可以運用
                    const result = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                    req.header=result.email;
                }
            });
            next();
        }
       
    }catch{
        return res.status(400).json("Error");
    }
};
