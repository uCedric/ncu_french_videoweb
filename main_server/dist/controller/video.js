"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update_video = exports.add_new_video = exports.user_get_all_Video = void 0;
const redis_1 = require("../model/redis");
const video_1 = require("../model/video");
const user_get_all_Video = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, video_1.getVideos)();
        if (!result) {
            return res.status(400).send({ message: "No videos found" });
        }
        const client = (0, redis_1.redisConnection)();
        client.setEx("videos", 3600, JSON.stringify(result));
        return res.status(200).send({ message: "Videos fetched successfully", result });
    }
    catch (_a) {
        return res.status(400).send({ message: "Bad Request" });
    }
});
exports.user_get_all_Video = user_get_all_Video;
const add_new_video = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, url, date } = req.body;
        const views = 0;
        const owneremail = req.header.toString();
        if (!owneremail || !title || !description || !url || !date) {
            return res.status(400).send({ message: "please fill all the fields" });
        }
        const result = yield (0, video_1.createVideo)({ owneremail, title, description, url, views, date });
        return res.status(200).send({ message: "Video added successfully", result });
    }
    catch (_b) {
        return res.status(400).send({ message: "Bad Request" });
    }
});
exports.add_new_video = add_new_video;
const update_video = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, url, views } = req.body;
        const { video_id } = req.params;
        const ownervideo = yield (0, video_1.getVideoById)(video_id);
        const owneremail = req.header.toString();
        if ((ownervideo === null || ownervideo === void 0 ? void 0 : ownervideo.owneremail) != owneremail) {
            return res.status(401).send({ message: "you are not the owner of this video !" });
        }
        const result = yield (0, video_1.updateVideoById)(video_id, { owneremail, title, description, url, views });
        return res.status(200).send({ message: "Video updated successfully", result });
    }
    catch (_c) {
        return res.status(400).send({ message: "Bad Request" });
    }
});
exports.update_video = update_video;
