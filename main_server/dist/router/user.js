"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAuthentication_1 = require("../middleware/isAuthentication");
const user_1 = require("../controller/user");
exports.default = (router) => {
    router.patch("/user/postlist/:post_id", isAuthentication_1.isAuthentication, user_1.update_favorite_post);
    router.patch("/user/videolist/:video_id", isAuthentication_1.isAuthentication, user_1.update_favorite_video);
};
