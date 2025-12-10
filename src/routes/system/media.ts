import {Router} from "express";
import AuthMiddlware from "../../middleware/AuthMiddlware";
import {controller as question} from "../../controller/evaluation/QuestionController";


export const router  = Router();

router.get('/field/video/:id', [AuthMiddlware], question.loadFieldVideo);
router.post('/field/video', [AuthMiddlware], question.saveFieldVideo);
router.post('/images', [AuthMiddlware], question.saveQuestionImage);
router.delete('/video/remove', [AuthMiddlware], question.removeVideo);
