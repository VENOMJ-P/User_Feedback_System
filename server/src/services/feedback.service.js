import FeedBackRepository from "../repositories/feedback.repository.js";

class FeedbackService{
    constructor(){
        this.feedbackRepository = new FeedBackRepository();
    }

    async create(data){
        try {
            const feedback= await this.feedbackRepository.create(data);
            return feedback
        } catch (error) {
            console.log("Something went wrong in feedback service");
            throw error;
        }
    }

    async getAll(filters = {}, pagination = {}) {
        try {
          const feedbacks = await this.feedbackRepository.getAll(filters, pagination);
          return feedbacks;
        } catch (error) {
          console.error("Error in feedbackService.getAll:", error);
          throw error;
        }
      }
}

export default FeedbackService;