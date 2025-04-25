import { errorResponse } from "../utils/response-handler.js";

export const validateFeedback = async(req,res,next)=>{
    try {
        const {username,email,feedback,category}= req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!username || !email || !feedback || !category){
            return errorResponse(res,400,"All fields are required");
        }

        if (!emailRegex.test(email)) {
            return errorResponse(res, 400, "Invalid email format");
        }
        
        if(category !== "suggestion" && category !== "bug report" && category !== "feature request" && category !== "other"){
            return errorResponse(res,400,"Invalid category");
        }

        next();
    } catch (error) {
        return errorResponse(res,500,"Internal server error",error);
    }
}