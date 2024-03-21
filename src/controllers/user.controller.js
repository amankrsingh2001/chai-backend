import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uplaodOnClodinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/Apiresponse.js";

const registerUser = asyncHandler(async (req, res) => {
 

    /* If Data coming from form or json we will get it thorugh req.body */
   const {username,email,fullname,password} = req.body
   console.log(username)
   


//    if(fullname===""){
//     throw new ApiError(400,"fullname is required")
//    }
        
if  (
    [fullname,username,email,password].some((field)=> field?.trim() ==="")
    )
    {
    throw new ApiError(400,"All fields are required");
    }

    const existedUser = User.findOne({
        $or :[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"username with email or username already exist")
    }


   const avtarLocalpath =  req.files?.avtar[0]?.path
   const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avtarLocalpath){
        throw new ApiError(400,'Avtar file is required')
    }

    const avtar =  await uplaodOnClodinary(avtarLocalpath)
    const coverImage = await uplaodOnClodinary(coverImageLocalPath)

    if(!avtar){
        throw new ApiError(400,"Avtar not found")
    }


   const user =  await User.create({
        fullname,
        avtar: avtar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
        if(!createdUser){
        throw new ApiError(500,"Something went wrong while registring the user")
    }
    });


    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )

// if(email.includes !=="@"){
//     throw new ApiError(400,"Email isn't valid")
// }ˀ



export {registerUser}



