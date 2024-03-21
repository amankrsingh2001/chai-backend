import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  // get userdetails from frontend {In this case as we dont have frontend currently we will get all the details from postman}
  // validation - not empty or username is correct or password is correct
  // check if user already exists: username and email
  // check for images , check for avtaar
  // uplaod them to cloudinary,avatat
  // create user object- create entry in db
  // remove password and refresh token filed from response
});
