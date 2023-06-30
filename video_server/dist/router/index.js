"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("./authentication"));
const user_1 = __importDefault(require("./user"));
const post_1 = __importDefault(require("./post"));
const video_1 = __importDefault(require("./video"));
const router = express_1.default.Router();
(0, authentication_1.default)(router);
(0, user_1.default)(router);
(0, post_1.default)(router);
(0, video_1.default)(router);
exports.default = router;
