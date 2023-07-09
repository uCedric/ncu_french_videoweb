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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.video_stream = exports.update_video = exports.add_new_video = exports.user_get_all_Video = void 0;
const redis_updatecache_1 = require("./redis_updatecache");
const fs_1 = __importDefault(require("fs"));
const video_1 = require("../model/video");
const user_get_all_Video = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, video_1.getVideos)();
        if (!data) {
            return res.status(400).send({ message: "No videos found" });
        }
        (0, redis_updatecache_1.redisConnection)(Object.entries(data));
        //client.setEx("videos",3600,JSON.stringify(result));
        return res.status(200).json(data);
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
const video_stream = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { video_id } = req.params;
        const videoPath = "./videos/" + video_id + ".mp4";
        const videoSize = fs_1.default.statSync(videoPath).size;
        console.log(videoSize);
        const range = req.headers.range;
        if (!range) {
            return res.status(400).send({ message: "Range header not found" });
        }
        const CHUNK_SIZE = 10 ** 6;
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };
        res.writeHead(206, headers);
        const videoStream = fs_1.default.createReadStream(videoPath, { start, end });
        videoStream.pipe(res);
        /*if(!result){
            return res.status(400).send({message:"No video found"});
        }*/
    }
    catch (err) {
        return res.status(400).send({ message: "Bad Request???", err });
    }
});
exports.video_stream = video_stream;
