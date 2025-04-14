import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcrypt";
import { Mentor } from "../models/mentor.model.js";

const registerMentor = AsyncHandler(async (req, res) => {
    const { fullname, mobile, password,rollno } = req.body;
    if (!fullname || !mobile || !password || !rollno) {
        throw new ApiError(400, "All fields are required");
    }
    const existingUser = await Mentor.findOne({
        $or: [
            { rollno: rollno },
            { mobile: mobile }
        ]
    });
    if (existingUser) {
        console.log("Mentor already exists");
        throw new ApiError(400, "Mentor already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const mentor = new Mentor({
        fullname,
        mobile,
        password: hashedPassword,
        rollno,
    });
    await mentor.save();
    const createdUser = await Mentor.findById(mentor._id).select("-password -refreshToken");
    console.log("User logged in successfully");
    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: createdUser
    });
});


const loginMentor = AsyncHandler(async (req, res) => {
    const { rollno, password } = req.body;

    // Check if rollno or password is missing
    if (!rollno || !password) {
        throw new ApiError(400, "All fields are mandatory");
    }
    const existingUser = await Mentor.findOne({ rollno: rollno });
    if (!existingUser) {
        throw new ApiError(404, "Mentor not found");
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
        throw new ApiError(400, "Invalid credentials");
    }
    const mentor = await Mentor.findById(existingUser._id).select("-password -refreshToken");
    console.log("User logged in successfully");
    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: mentor
    });
})

const createAssignment = AsyncHandler(async (req, res) => {
    const {subject, submissiondate, mentorid, targets} = req.body;
});


export {
    registerMentor,
    loginMentor,
}