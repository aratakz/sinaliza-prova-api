import {Router} from 'express';
import AuthMiddlware from "../middleware/AuthMiddlware";
import ExamController from "../controller/ExamController";


const examRoutes = Router();

examRoutes.post('/register', [AuthMiddlware], ExamController.register);


export default examRoutes;