import {Router} from 'express';
import AuthMiddlware from "../middleware/AuthMiddlware";
import QuestionTagsController from "../controller/QuestionTagsController";


const questionTagsRoutes = Router();

questionTagsRoutes.post('/register', [AuthMiddlware], QuestionTagsController.create);
export default questionTagsRoutes;