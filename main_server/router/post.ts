import express from "express";
import { isAuthentication } from "../middleware/isAuthentication";
import { add_new_post } from "../controller/post";

export default (router:express.Router)=>{ 
    router.post("/post",isAuthentication,add_new_post);
};
