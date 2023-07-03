import express from "express"
import dotenv from "dotenv"
import compression from "compression"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose, { mongo } from "mongoose"
import redis from "redis"

import router from "./router/index";

dotenv.config();

const app=express();
const port=process.env.PORT;

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
    credentials:true
}));
app.use("/",router);

app.listen(port,()=>{console.log(`[server]: Server is running at http://localhost:${port}`);})

//mongo db 連線
const MONGO_URL = `mongodb+srv://ncu_admin:${process.env.MONGO_PWD}@cluster0.9rmxlrs.mongodb.net/${process.env.MONGO_DB}`;
mongoose.Promise=Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error',(error:Error)=>console.log(error));