"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAuthentication_1 = require("../middleware/isAuthentication");
const post_1 = require("../controller/post");
exports.default = (router) => {
    router.post("/post", isAuthentication_1.isAuthentication, post_1.add_new_post);
};
