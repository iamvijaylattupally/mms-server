import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcrypt";
import {Admin} from "../models/admin.model.js"

const registeradmin = AsyncHandler(async (req, res) => {
    const {fullname,password,mobile,rollno} = req.body; 
    if(!fullname || !password || !mobile || !rollno){
        throw new ApiError(400, "Please fill all the fields");
    }
    const existingUser = await Admin.findOne({
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
    const admin = new Admin({
        fullname,
        mobile,
        password: hashedPassword,  // Save the hashed password
        rollno,
    });
    await admin.save();
    const createdUser = await Admin.findById(admin._id).select("-password -refreshToken");
    if (!createdUser) {
        console.log("User not created");
        throw new ApiError(500, "Internal Server Error");
    }
    console.log("Admin created successfully");
    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: createdUser
    });

})

const loginadmin = AsyncHandler(async (req, res) => {
    const { rollno, password } = req.body;
    if (!rollno || !password) {
        throw new ApiError(400, "Please fill all the fields");
    }
    const existingadmin = await Admin.findOne({ rollno: rollno });
    if (!existingadmin) {
        throw new ApiError(404, "User not found");
    }
    const isMatch = await bcrypt.compare(password, existingadmin.password);
    if (!isMatch) {
        throw new ApiError(400, "Invalid Credentials");
    }
    const admin = await Admin.findById(existingadmin._id).select("-password -refreshToken");
    console.log("User logged in successfully");
    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: admin
    });

})
export {
    registeradmin,
    loginadmin,
    
}