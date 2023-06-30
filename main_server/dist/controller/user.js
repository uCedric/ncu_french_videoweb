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
exports.update_favorite_video = exports.update_favorite_post = exports.update = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../model/user");
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const email = req.header.toString();
        const user = yield (0, user_1.getUserByEmail)(email);
        //確認是否有此使用者
        if (!user) {
            return res.status(400).json("User not exists");
        }
        //密碼雜湊加密
        const hashedpassword = yield bcrypt_1.default.hash(password, 10);
        //更新資料庫
        const storeUser = yield (0, user_1.updateUserById)(user._id.toString(), { username, hashedpassword });
        return res.status(200).json("success !!!").end();
    }
    catch (_a) {
        return res.status(400).json("Error");
    }
});
exports.update = update;
const update_favorite_post = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { post_id } = req.params;
        const email = req.header.toString();
        //新增收藏文章
        const user = yield (0, user_1.getUserByEmail)(email);
        if (user) {
            const storeUser = yield (0, user_1.updateUserById_favorite_post)(user._id.toString(), { post_id });
        }
        return res.status(200).json("success !!!").end();
    }
    catch (_b) {
        return res.status(400).json("Error");
    }
});
exports.update_favorite_post = update_favorite_post;
const update_favorite_video = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { video_id } = req.params;
        const email = req.header.toString();
        //新增收藏文章
        const user = yield (0, user_1.getUserByEmail)(email);
        if (user) {
            const storeUser = yield (0, user_1.updateUserById_favorite_video)(user._id.toString(), { video_id });
        }
        return res.status(200).json("success !!!").end();
    }
    catch (_c) {
        return res.status(400).json("Error");
    }
});
exports.update_favorite_video = update_favorite_video;
