import express from "express";

import authentication from "./authentication";
import user from "./user";
import post from "./post";
import video from "./video";

const router = express.Router();
authentication(router);
user(router);
post(router);
video(router);
export default router;