import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    feedback:{
        type:String,
        required:true
    },
    category:{
        type: String,
        enum: ["suggestion", "bug report", "feature request","other"],
        required: true
    }
},
{
    timestamps:true,
});

const Feedback = mongoose.model("Feedback",feedbackSchema);

export default Feedback;