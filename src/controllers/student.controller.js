import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { Student } from "../models/student.model.js";


const getAllStudents = AsyncHandler(async (req, res) => {
    console.log("Fetching all students...");
    const {mentorid} = req.body; 
    // Check if mentorid is provided
    if (!mentorid) {
        throw new ApiError(400, "Mentor ID is required");
    }
    // Find students assigned to the mentor
    const students = await Student.find({ mentorid }).select("fullname rollno mobile dob fathername fathernumber mothername mothernumber curryear currsem noofbacklogs cgpa isverified ismentor isadmin");

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

const editStudent = AsyncHandler(async (req, res) => {
    const { rollno } = req.body; // Get rollno from the request body
    const {
        fullname,
        mobile,
        dob,
        fathername,
        fathernumber,
        mothername,
        mothernumber,
        curryear,
        currsem,
        noofbacklogs,
        cgpa
    } = req.body;

    // Check if rollno and required fields are provided
    if (!rollno || !fullname || !mobile || !dob) {
        throw new ApiError(400, "Roll No, Full Name, Mobile, and DOB are required fields");
    }

    // Find the student by rollno
    const student = await Student.findOne({ rollno });

    if (!student) {
        throw new ApiError(404, `Student with rollno ${rollno} not found`);
    }

    // Update the student details
    student.fullname = fullname;
    student.mobile = mobile;
    student.dob = dob;
    student.fathername = fathername || student.fathername;
    student.fathernumber = fathernumber || student.fathernumber;
    student.mothername = mothername || student.mothername;
    student.mothernumber = mothernumber || student.mothernumber;
    student.curryear = curryear || student.curryear;
    student.currsem = currsem || student.currsem;
    student.noofbacklogs = noofbacklogs || student.noofbacklogs;
    student.cgpa = cgpa || student.cgpa;

    // Save the updated student
    await student.save();

    // Return the updated student object
    res.status(200).json({
        success: true,
        message: "Student profile updated successfully",
        data: student
    });
});


export{
    getAllStudents,
    getUnassignedStudents,
    editStudent
}