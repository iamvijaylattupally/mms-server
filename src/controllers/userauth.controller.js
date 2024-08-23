import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const registerUser = asyncHandler(async (req, res) => {
    const {name,email,password} = req.body;
    if(!name || !email || !password){ 
        throw new ApiError(400,"All fields are required");
    }
    res
    .status(201)
    .json(new ApiResponse(201,{name,email},"User registered successfully"));
});

export {
    registerUser
}