import Feedback from "../models/feedback.model.js";

class FeedBackRepository{
    async create(data){
        try {
            console.log("recieved")
            const feedback = await Feedback.create(data);
            return feedback;
        } catch (error) {
            console.log("Something went wrong in the feedback repository layer");
            throw error;
        }
    }

    async getAll(){
        try {
            const feedbacks = await Feedback.find();
            return feedbacks;
        } catch (error) {
            console.log("Something went wrong in the feedback repository layer");
            throw error;
        }
    }

}

export default FeedBackRepository;