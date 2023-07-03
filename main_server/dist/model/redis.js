"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisConnection = void 0;
const redis_1 = __importDefault(require("redis"));
const redisConnection = () => {
    const client = redis_1.default.createClient();
    client.on("error", (error) => {
        console.log(error);
    });
    return client;
};
exports.redisConnection = redisConnection;
