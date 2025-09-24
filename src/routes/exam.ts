import {Router} from 'express';
import AuthMiddlware from "../middleware/AuthMiddlware";
import ExamController from "../controller/ExamController";


const questionRoutes = Router();

questionRoutes.post('/register', [AuthMiddlware], ExamController.register);


export default questionRoutes;