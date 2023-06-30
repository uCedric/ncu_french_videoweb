"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVideoById = exports.createVideo = exports.getVideoByOwnerEmail = exports.getVideoById = exports.getVideos = exports.VideoModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const VideoSchema = new mongoose_1.default.Schema({
    owneremail: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    views: { type: Number, required: false },
    date: { type: Date, required: true },
});
exports.VideoModel = mongoose_1.default.model('Video', VideoSchema);
const getVideos = () => exports.VideoModel.find();
exports.getVideos = getVideos;
const getVideoById = (id) => exports.VideoModel.findById(id);
exports.getVideoById = getVideoById;
const getVideoByOwnerEmail = (owneremail) => exports.VideoModel.findOne({ owneremail });
exports.getVideoByOwnerEmail = getVideoByOwnerEmail;
const createVideo = (values) => {
    const video = new exports.VideoModel(values);
    const result = video.save();
    return result;
};
exports.createVideo = createVideo;
const updateVideoById = (id, values) => exports.VideoModel.findByIdAndUpdate(id, values);
exports.updateVideoById = updateVideoById;
