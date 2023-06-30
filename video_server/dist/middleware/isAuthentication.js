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
exports.isAuthentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const SECRET_KEY = "fr_videoweb";
        const token = (_a = req.header('auth')) === null || _a === void 0 ? void 0 : _a.toString().split(' ')[1];
        if (!token) {
            return res.status(401).json("token not found");
        }
        else {
            //jwt驗證
            jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, payload) => {
                if (err) {
                    return res.status(401).json(err);
                }
                else {
                    //增加email訊息至header讓後面的路由可以運用
                    const result = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                    req.header = result.email;
                }
            });
            next();
        }
    }
    catch (_b) {
        return res.status(400).json("Error");
    }
});
exports.isAuthentication = isAuthentication;
