import FeedbackService from "../services/feedback.service.js";
import { successResponse, errorResponse } from "../utils/response-handler.js";

const feedbackService = new FeedbackService();

export const createFeedback = async(req,res)=>{
    try {
        console.log("recadf")
        const {username,email,feedback,category}= req.body;
        const response = await feedbackService.create({username,email,feedback,category});
        return successResponse(res,201,"Feedback created successfully",response)
    } catch (error) {
        return errorResponse(res,500,"Something went wrong",error)
    }
}

export const getFeedbacks = async(req,res)=>{
    try {
        const response = await feedbackService.getAll();
        return successResponse(res,201,"Successfully get all feedbacks",response)
    } catch (error) {
        return errorResponse(res,500,"Something went wrong",error)
    }
}