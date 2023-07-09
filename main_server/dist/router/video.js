"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAuthentication_1 = require("../middleware/isAuthentication");
const video_1 = require("../controller/video");
exports.default = (router) => {
    router.post("/video/", isAuthentication_1.isAuthentication, video_1.add_new_video);
    router.get("/video/all", video_1.user_get_all_Video);
    router.post("/video/:video_id", isAuthentication_1.isAuthentication, video_1.update_video);
};
