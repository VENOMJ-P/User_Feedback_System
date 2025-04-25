import {Router} from "express"
import { createFeedback, getFeedbacks } from "../../controllers/feedback.controller.js";
import { validateFeedback } from "../../middlewares/validate-feedback.middleware.js";

const router = Router();

router.get("/",getFeedbacks);
router.post("/",validateFeedback,createFeedback);

export default router;