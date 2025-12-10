import {Router} from 'express';
import AuthMiddlware from "../../middleware/AuthMiddlware";
import {controller} from "../../controller/evaluation/QuestionOptionController";


export const router:Router = Router();

router.post('/register', [AuthMiddlware], controller.create);
router.get('/find/question/:id', [AuthMiddlware], controller.getByQuestionId);
router.post('/answer/', [AuthMiddlware], controller.answer);
router.patch('/finish/:id', [AuthMiddlware], controller.finish);
