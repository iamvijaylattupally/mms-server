import {Router} from "express";
import {getAllStudents,getUnassignedStudents,editStudent} from "../controllers/student.controller.js"
import {applyleave,getStudentLeaves} from "../controllers/leave.controller.js"

const router = Router();

router.route("/getstudents").get(getAllStudents)
router.route("/getunassignedstudents").get(getUnassignedStudents)
router.route("/editstudent").patch(editStudent);
router.route("/applyleave").post(applyleave);
router.route("/getstudentsleaves").get(getStudentLeaves)


export default router;