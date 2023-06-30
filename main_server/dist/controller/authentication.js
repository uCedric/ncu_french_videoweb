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
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../model/user");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = req.body;
        //檢查是否有空值
        if (!email || !password || !username) {
            return res.status(400).json("Missing fields");
        }
        //檢查信箱格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.match(emailRegex)) {
            return res.status(400).json("Invalid email format");
        }
        //檢查是否已經註冊過
        const existingUser = yield (0, user_1.getUserByEmail)(email);
        if (existingUser) {
            return res.status(400).json("User already exists");
        }
        //密碼雜湊加密
        const hashedpassword = yield bcrypt_1.default.hash(password, 10);
        //存入資料庫
        const storeUser = yield (0, user_1.createUser)({ email, username, hashedpassword });
        return res.status(200).json(storeUser).end();
    }
    catch (_a) {
        return res.status(400).json("Error");
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        //檢查是否有空值
        if (!email || !password) {
            return res.status(400).json("Missing fields");
        }
        //檢查信箱格式
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.match(emailRegex)) {
            return res.status(400).json("Invalid email format");
        }
        //找出此email的使用者
        const user = yield (0, user_1.getUserByEmail)(email);
        if (!user) {
            return res.status(400).json("User not exists");
        }
        else {
            //檢查密碼是否正確
            const match = yield bcrypt_1.default.compare(password, user.hashedpassword);
            if (!match) {
                return res.status(400).json("Wrong password");
            }
        }
        //建立token
        const SECRET_KEY = "fr_videoweb";
        const token = jsonwebtoken_1.default.sign({ email: email }, SECRET_KEY, { expiresIn: '1 day' });
        return res.status(200).json(token).end();
    }
    catch (_b) {
        return res.status(400).json("Error");
    }
});
exports.login = login;
