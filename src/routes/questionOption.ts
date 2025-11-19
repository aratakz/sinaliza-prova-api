import {Router} from 'express';
import AuthMiddlware from "../middleware/AuthMiddlware";
import QuestionOptionController from "../controller/QuestionOptionController";


const questionOptionRoutes = Router();

questionOptionRoutes.post('/register', [AuthMiddlware], QuestionOptionController.create);
questionOptionRoutes.get('/find-question/:id', [AuthMiddlware], QuestionOptionController.findByQuestionId);
export default questionOptionRoutes;