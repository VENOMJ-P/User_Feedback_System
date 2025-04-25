import FeedBackRepository from "../repositories/feedback.repository.js";

class FeedbackService{
    constructor(){
        this.feedbackRepository = new FeedBackRepository();
    }

    async create(data){
        try {
            console.log("recieved")
            const feedback= await this.feedbackRepository.create(data);
            return feedback
        } catch (error) {
            console.log("Something went wrong in feedback service");
            throw error;
        }
    }

    async getAll(){
        try {
            const feedbacks= await this.feedbackRepository.getAll();
            return feedbacks
        } catch (error) {
            console.log("Something went wrong in feedback service");
            throw error;
        }
    }
}

export default FeedbackService;