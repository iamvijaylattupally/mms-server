import AsyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { Student } from "../models/student.model.js";
import { Mentor } from "../models/mentor.model.js";
import { Leave } from "../models/leave.model.js";

const applyleave = AsyncHandler(async (req, res) => {
    const { from, to, subject, body, salutation, applicationdate } = req.body;

    // Validate required fields
    if (!from || !to || !subject || !body || !salutation || !applicationdate) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if the student exists
    const student = await Student.findOne({ rollno: from });
    if (!student) {
        throw new ApiError(404, "Student not found");
    }

    // Check if the mentor exists
    const mentor = await Mentor.findById(to);
    if (!mentor) {
        throw new ApiError(404, "Mentor not found");
    }

    // Create the leave application
    const leaveApplication = new Leave({
        from,
        to,
        subject,
        body,
        salutation,
        applicationdate,
        isPending: true,
        isAccepted: false,
    });

    // Save the leave application
    await leaveApplication.save();

    // Send success response
    res.status(201).json({
        success: true,
        message: "Leave application submitted successfully",
        leave: leaveApplication,
    });
});

const getStudentLeaves = AsyncHandler(async (req, res) => {
    const { rollno } = req.query;

    // Validate roll number
    if (!rollno) {
        throw new ApiError(400, "Roll number is required");
    }
    const student = await Student.findOne({ rollno: rollno });
    if (!student) {
        throw new ApiError(404, "Student not found");
    }
    // Retrieve leave applications for the given roll number
    const leaves = await Leave.find({ from: rollno });

    // Check if any leave applications exist
    if (!leaves || leaves.length === 0) {
        throw new ApiError(404, "No leave applications found for this roll number");
    }

    // Send response with the leave applications
    res.status(200).json({
        success: true,
        message: `Leave applications retrieved successfully for roll number: ${rollno}`,
        leaves,
    });
});

const getMentorLeaves = AsyncHandler(async (req, res) => {
    const { rollno } = req.query;

    // Validate mentor ID
    if (!rollno) {
        throw new ApiError(400, "Mentor ID is required");
    }

    // Check if the mentor exists
    const mentor = await Mentor.findOne({ rollno: rollno });
    if (!mentor) {
        throw new ApiError(404, "Mentor not found");
    }

    // Retrieve leave applications for the given mentor
    const leaves = await Leave.find({ to: mentor._id});

    // Check if any leave applications exist
    if (!leaves || leaves.length === 0) {
        throw new ApiError(404, "No leave applications found for this mentor");
    }

    // Send response with the leave applications
    res.status(200).json({
        success: true,
        message: `Leave applications retrieved successfully for mentor: ${rollno}`,
        leaves,
    });
});

const updateletter = AsyncHandler(async (req, res) => {
    const { leaveId, isAccepted } = req.body;

    // Validate required fields
    if (!leaveId || typeof isAccepted !== "boolean") {
        throw new ApiError(400, "Leave ID and isAccepted status are required");
    }

    // Find the leave application
    const leave = await Leave.findById(leaveId);
    if (!leave) {
        throw new ApiError(404, "Leave application not found");
    }

    // Update the leave application
    leave.isAccepted = isAccepted;
    leave.isPending = false;

    // Save the updated leave application
    await leave.save();

    // Send success response
    res.status(200).json({
        success: true,
        message: `Leave application has been ${isAccepted ? "approved" : "rejected"}`,
        leave,
    });
});
export {
    applyleave,
    getStudentLeaves,
    getMentorLeaves,
    updateletter,
};
