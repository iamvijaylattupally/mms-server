import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcrypt";
import { Student } from "../models/student.model.js";

const registerUser = AsyncHandler(async (req, res) => {
    const { fullname, mobile, password, rollno, dob, fathername, fathernumber, mothername, mothernumber, curryear, currsem, noofbacklogs, cgpa } = req.body;
    
    const fields = { fullname, mobile, password, rollno, dob, fathername, fathernumber, mothername, mothernumber, curryear, currsem, noofbacklogs, cgpa };
    for (const [key, value] of Object.entries(fields)) {
        if (!value) {
            throw new ApiError(400, `${key} is required`);
        }
    }


    const existingUser = await Student.findOne({
        $or: [
            { rollno: rollno },
            { mobile: mobile }
        ]
    });

    if (existingUser) {
        console.log("User already exists");
        throw new ApiError(400, "User already exists");
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new student instance
    const student = new Student({
        fullname,
        mobile,
        password: hashedPassword,  // Save the hashed password
        rollno,
        dob,
        fathername,
        fathernumber,
        mothername,
        mothernumber,
        curryear,
        currsem,
        noofbacklogs,
        cgpa
    });

    // Save the student data to the database
    await student.save();

    // Retrieve the created user without the password field
    const createdUser = await Student.findById(student._id).select("-password -refreshToken");

    if (!createdUser) {
        console.log("User not created");
        throw new ApiError(500, "Internal Server Error");
    }

    console.log("User created successfully");

    // Send success response
    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: createdUser
    });
});



//login route
const loginUser = AsyncHandler(async (req, res) => {
    const { rollno, password } = req.body;

    // Check if rollno or password is missing
    if (!rollno || !password) {
        throw new ApiError(400, "All fields are mandatory");
    }
    console.log(rollno, password);
    // Find the user by rollno
    const existingUser = await Student.findOne({ rollno: rollno });
    if (!existingUser) {
        throw new ApiError(404, "User not found");
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
        throw new ApiError(400, "Invalid credentials");
    }

    // Fetch the student details without password and refreshToken
    const student = await Student.findById(existingUser._id).select("-password -refreshToken");
    
    // Log success and return the response
    console.log("User logged in successfully");
    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: student
    });
});


export {
    registerUser,
    loginUser
};
