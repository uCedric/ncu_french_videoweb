import express from "express";

import { isAuthentication } from "../middleware/isAuthentication";
import { add_new_video, user_get_all_Video, update_video,video_stream } from "../controller/video";

export default (router:express.Router)=>{
    router.post("/video/",isAuthentication,add_new_video);
    router.get("/video/all",isAuthentication,user_get_all_Video);
    router.patch("/video/:video_id",isAuthentication,update_video);
    router.get("/videostream/:video_id",video_stream);
};