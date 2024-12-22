import {Router} from "express";
import {getAllStudents,getUnassignedStudents} from "../controllers/student.controller.js"


const router = Router();

router.route("/getstudents").get(getAllStudents)
router.route("/getunassignedstudents").get(getUnassignedStudents)



export default router;