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
exports.add_new_post = void 0;
const post_1 = require("../model/post");
const add_new_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const owneremail = req.header.toString();
        const created_at = new Date();
        //新增文章
        const storePost = yield (0, post_1.createPost)({ owneremail, title, content, created_at });
    }
    catch (_a) {
        return res.status(400).json("Error");
    }
});
exports.add_new_post = add_new_post;
