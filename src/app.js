import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(bodyParser.json());
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

//import routes
import userAuthRoute from "./routes/userAuth.route.js";



//use routes
app.use("/api/v1/auth",userAuthRoute);




export {app}