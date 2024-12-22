import { Router } from "express";
import {sendMail} from "../controllers/mail.controller.js";

const router = Router();

router.route("/send").post(sendMail);

export default router;