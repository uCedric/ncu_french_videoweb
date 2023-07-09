"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis = require("redis");
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use('/', router_1.default);
app.get('/', (req, res) => {
    console.log(req);
    res.send('Hello, World!!!!!!!!!!');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
