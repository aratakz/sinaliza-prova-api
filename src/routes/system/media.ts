import {Router} from "express";
import AuthMiddlware from "../../middleware/AuthMiddlware";
import {controller as question} from "../../controller/evaluation/QuestionController";


export const router  = Router();

router.get('/field/video/:id', [AuthMiddlware], question.loadFieldVideo);
