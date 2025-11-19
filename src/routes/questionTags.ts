import {Router} from 'express';
import AuthMiddlware from "../middleware/AuthMiddlware";
import ExamController from "../controller/ExamController";


const examsRoutes = Router();

examsRoutes.post('/create', [AuthMiddlware], ExamController.register);
examsRoutes.get('/list', [AuthMiddlware], ExamController.list);
examsRoutes.get('/find/:id', [AuthMiddlware], ExamController.findOne);
export default examsRoutes;