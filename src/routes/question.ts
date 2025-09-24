import {Router} from 'express';
import AuthMiddlware from "../middleware/AuthMiddlware";
import QuestionController from "../controller/QuestionController";


const questionRoutes = Router();

questionRoutes.post('/register', [AuthMiddlware], QuestionController.register);
questionRoutes.get('/list', [AuthMiddlware], QuestionController.list);
questionRoutes.get('/find/:id', [AuthMiddlware], QuestionController.findOne);
questionRoutes.get('/search/', [AuthMiddlware], QuestionController.search);
questionRoutes.patch('/update/:id', [AuthMiddlware], QuestionController.update);
questionRoutes.delete('/:id', [AuthMiddlware], QuestionController.remove);

export default questionRoutes;