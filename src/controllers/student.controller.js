import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { Student } from "../models/student.model.js";


const getAllStudents = AsyncHandler(async (req, res) => {
    const students = await Student.find().select("fullname rollno mobile dob fathername fathernumber mothername mothernumber curryear currsem noofbacklogs cgpa isverified ismentor isadmin");

    if (!students) {
        throw new ApiError(404, "No students found");
    }

    // Send response with student data
    res.status(200).json({
        success: true,
        message: "Students retrieved successfully",
        data: students
    });

})

const getUnassignedStudents = AsyncHandler(async (req, res) => {
    const unassignedStudents = await Student.find({ isverified: false })
        .select(
            "fullname rollno mobile dob fathername fathernumber mothername mothernumber curryear currsem noofbacklogs cgpa isverified ismentor isadmin"
        );

    if (!unassignedStudents || unassignedStudents.length === 0) {
        throw new ApiError(404, "No unassigned students found");
    }
    res.status(200).json({
        success: true,
        message: "Unassigned students retrieved successfully",
        data: unassignedStudents,
    });
});

export{
    getAllStudents,
    getUnassignedStudents,
}