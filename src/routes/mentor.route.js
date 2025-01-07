import {Router} from "express";
import {registerMentor,loginMentor} from "../controllers/mentorauth.controller.js";
import{addEvent,getAllEvents} from "../controllers/calendar.controller.js"

const router = Router();

router.route("/signup").post(registerMentor);
router.route("/login").post(loginMentor);
router.route("/addevent").post(addEvent);
router.route("/getevents").get(getAllEvents);



export default router;