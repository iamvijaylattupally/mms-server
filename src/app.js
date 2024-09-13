import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({
    path:'./.env'
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));


//import routes
import userAuthRoute from "./routes/userAuth.route.js";



//use routes
app.use("/api/v1/auth",userAuthRoute);




export {app}