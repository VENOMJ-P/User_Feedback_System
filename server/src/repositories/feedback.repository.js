import Feedback from "../models/feedback.model.js";

class FeedBackRepository{
    async create(data){
        try {
            const feedback = await Feedback.create(data);
            return feedback;
        } catch (error) {
            console.log("Something went wrong in the feedback repository layer");
            throw error;
        }
    }

    async getAll(filters = {}, { page = 1, limit = 10, sort = { createdAt: -1 } } = {}) {
        try {
          const skip = (page - 1) * limit;
      
          const [data, total] = await Promise.all([
            Feedback.find(filters).sort(sort).skip(skip).limit(limit),
            Feedback.countDocuments(filters)
          ]);

          const totalPages = Math.ceil(total / limit);
      
          return {
            data,
            total,
            currentPage: page,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
          };
        } catch (error) {
          console.error("Error in feedbackRepository.getAll:", error);
          throw error;
        }
      }

}

export default FeedBackRepository;