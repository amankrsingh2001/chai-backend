import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from '../middleware/multter.middleware.js';

const router = Router();

router.route("/register").post(
    upload.fields([
         {  name:"avtar",
            maxCount:1},
            
        {
            name:"CoverImage",
            maxCount:1,
        }
    ]), /*This filed accepts array  */
    registerUser
    );

export default router
