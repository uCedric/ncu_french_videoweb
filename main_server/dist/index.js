"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./router/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    credentials: true
}));
app.use("/", index_1.default);
app.listen(port, () => { console.log(`[server]: Server is running at http://localhost:${port}`); });
//mongo db 連線
const MONGO_URL = `mongodb+srv://ncu_admin:${process.env.MONGO_PWD}@cluster0.9rmxlrs.mongodb.net/${process.env.MONGO_DB}`;
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(MONGO_URL);
mongoose_1.default.connection.on('error', (error) => console.log(error));
