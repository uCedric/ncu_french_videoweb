"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostById = exports.updatePostById = exports.createPost = exports.getPostById = exports.getPostByOwnerEmail = exports.getPosts = exports.PostModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    owneremail: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    created_at: { type: Date, required: true },
});
exports.PostModel = mongoose_1.default.model('Post', PostSchema);
const getPosts = () => exports.PostModel.find();
exports.getPosts = getPosts;
const getPostByOwnerEmail = (owneremail) => exports.PostModel.findById(owneremail);
exports.getPostByOwnerEmail = getPostByOwnerEmail;
const getPostById = (id) => exports.PostModel.findById(id);
exports.getPostById = getPostById;
const createPost = (values) => {
    const post = new exports.PostModel(values);
    const result = post.save();
    return result;
};
exports.createPost = createPost;
const updatePostById = (id, values) => exports.PostModel.findByIdAndUpdate(id, values);
exports.updatePostById = updatePostById;
const deletePostById = (id) => exports.PostModel.findByIdAndDelete(id);
exports.deletePostById = deletePostById;
