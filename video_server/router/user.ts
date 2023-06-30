import express from "express";

import { isAuthentication } from "../middleware/isAuthentication";
import { update,update_favorite_post,update_favorite_video } from "../controller/user";

export default (router:express.Router)=>{
    router.patch("/user/post/:post_id",isAuthentication,update_favorite_post);
    router.patch("/user/video/:video_id",isAuthentication,update_favorite_video);
}