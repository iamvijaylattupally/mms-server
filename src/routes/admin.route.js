import {Router} from "express";
import {registeradmin,loginadmin} from "../controllers/adminsignup.controller.js"
import { assignStudents } from "../controllers/assignstudents.controller.js";

const router = Router();

router.route("/signup").post(registeradmin)
router.route("/login").post(loginadmin)
router.route("/assign").post(assignStudents)


export default router;