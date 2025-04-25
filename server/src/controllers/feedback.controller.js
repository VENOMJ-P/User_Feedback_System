import FeedbackService from "../services/feedback.service.js";
import { successResponse, errorResponse } from "../utils/response-handler.js";

const feedbackService = new FeedbackService();

export const createFeedback = async(req,res)=>{
    try {
        const {name,email,message,category}= req.body;
        const response = await feedbackService.create({name,email,message,category});
        return successResponse(res,201,"Feedback created successfully",response)
    } catch (error) {
        return errorResponse(res,500,"Something went wrong",error)
    }
}

export const getFeedbacks = async (req, res) => {
    try {
      const { category, name,email, sortBy = 'createdAt', order = 'desc', page = 1, limit = 10 } = req.query;
  
      const filters = {};
      if (category) filters.category = category;
      if (name) filters.name = { $regex: new RegExp(name, 'i') }; 
      if (email) filters.email = { $regex: new RegExp(email, 'i') }; 
  
      const pagination = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { [sortBy]: order === 'asc' ? 1 : -1 }
      };
  
      const result = await feedbackService.getAll(filters, pagination);
      console.log(result)
      return successResponse(res, 200, "Successfully fetched feedbacks", result);
    } catch (error) {
      console.error("Error in getFeedbacks:", error);
      return errorResponse(res, 500, "Something went wrong", error.message);
    }
  };
  