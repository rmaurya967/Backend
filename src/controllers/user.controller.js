import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/APiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/fileUpload.js";
import { ApiResponse  } from "../utils/ApiResponse.js";
import { response } from "express";


const registerUser = asyncHandler( async (req, res) => {   
    // getting user response from postman/frontend
    const { fullname, email, username, password } = req.body;

    if (
        [fullname, email, username, password].some((fileds) => fileds?.trim() === "")
    ) {
        throw new ApiError(400, "Please fill Required Fileds")
    }
    if (!email.includes("@")) {
        throw new ApiError(422, "Please provide valid email")
    }

    const alreadyUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (alreadyUser) {
        throw new ApiError (409, "username or email already exist");
    }

    const avatarTempPath = req.files?.avatar?.[0]?.path;
    const coverImageTempPath = req.files?.coverImage?.[0]?.path;

    if (!avatarTempPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    const avatar = await uploadOnCloudinary(avatarTempPath);
    const coverImage = await uploadOnCloudinary(coverImageTempPath);

    if (!coverImageTempPath) {
        throw new ApiError(400, "Cover image file is required");
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw ApiError(500, "User Register failed");
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User Registered Sucessfully")); 

})


export { registerUser }