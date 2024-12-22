import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { Mentor } from "../models/mentor.model.js";
import { Student } from "../models/student.model.js"

const assignStudents = AsyncHandler(async (req, res) => {
    const { mentorroll, students } = req.body;

    if (!mentorroll || !students || students.length === 0) {
        throw new ApiError(400, "Mentor roll number and student list are required.");
    }

    // Normalize roll numbers
    const normalizedStudents = students.map(student => student.rollno.trim().toLowerCase());
    console.log("Normalized student roll numbers:", normalizedStudents);

    // Find mentor by roll number
    const mentor = await Mentor.findOne({ rollno: mentorroll.trim().toLowerCase() });

    if (!mentor) {
        throw new ApiError(404, "Mentor not found.");
    }

    // Find students by roll number
    const matchedStudents = await Student.find({ rollno: { $in: normalizedStudents } });
    console.log("Matched students:", matchedStudents);

    if (matchedStudents.length === 0) {
        throw new ApiError(404, "No matching students found.");
    }

    // Extract student IDs
    const studentIds = matchedStudents.map(student => student._id);

    // Update students' mentor ID and verification status
    const updateResult = await Student.updateMany(
        { rollno: { $in: normalizedStudents } },
        { $set: { isverified: true, mentorid: mentor._id } }
    );
    console.log("Update result:", updateResult);

    // Update mentor's mentees list
    mentor.mentess = [...mentor.mentess, ...studentIds];
    await mentor.save();

    res.status(200).json({
        success: true,
        message: "Students successfully assigned to the mentor.",
        data: {
            mentor: mentor.fullname,
            assignedStudents: matchedStudents.map(student => student.rollno),
        },
    });
});

export {
    assignStudents,
}