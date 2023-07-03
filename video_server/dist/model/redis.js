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
exports.redisConnection = void 0;
const redis = require("redis");
const redisConnection = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const client = redis.createClient();
    console.log(data[0][1]._id.toString());
    for (let i = 0; i < data.length; i++) {
        client.rpush("playlist1", data[i][1]._id.toString(), redis.print).then((result) => {
            console.log(`Item pushed to list "playlist1".`);
        })
            .catch((error) => {
            console.error('Error:', error);
        })
            .finally(() => {
            client.quit();
        });
    }
});
exports.redisConnection = redisConnection;
//const client = redis.createClient();
