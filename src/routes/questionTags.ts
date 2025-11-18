import {Router} from 'express';
import AuthMiddlware from "../middleware/AuthMiddlware";
import ExamController from "../controller/ExamController";


const questionTagsRoutes = Router();

questionTagsRoutes.post('/create', [AuthMiddlware], ExamController.register);
questionTagsRoutes.get('/list', [AuthMiddlware], ExamController.list);
export default questionTagsRoutes;