import {Router} from "express";
import {registerMentor,loginMentor} from "../controllers/mentorauth.controller.js";


const router = Router();

router.route("/signup").post(registerMentor);
router.route("/login").post(loginMentor);



export default router;