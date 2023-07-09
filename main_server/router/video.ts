import express from "express";

import { isAuthentication } from "../middleware/isAuthentication";
import { add_new_video, user_get_all_Video, update_video } from "../controller/video";

export default (router:express.Router)=>{
    router.post("/video/",isAuthentication,add_new_video);
    router.get("/video/all",user_get_all_Video);
    router.post("/video/:video_id",isAuthentication,update_video);
};