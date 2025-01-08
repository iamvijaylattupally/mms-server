import {Router} from "express";
import {getAllStudents,getUnassignedStudents,editStudent} from "../controllers/student.controller.js"


const router = Router();

router.route("/getstudents").get(getAllStudents)
router.route("/getunassignedstudents").get(getUnassignedStudents)
router.route("/editstudent").patch(editStudent);



export default router;