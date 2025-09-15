import {Router} from 'express';
import AuthMiddlware from "../middleware/AuthMiddlware";
import QuestionController from "../controller/QuestionController";


const questionRoutes = Router();

questionRoutes.post('/register', [AuthMiddlware], QuestionController.register);
questionRoutes.get('/list', [AuthMiddlware], QuestionController.list);

export default questionRoutes;