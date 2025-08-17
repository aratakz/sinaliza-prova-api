import {Router} from 'express';
import CourseDetailController from '../controller/CourseDetailController';
import authMiddleware from '../middleware/AuthMiddlware';

const courseRoutes = Router();

courseRoutes.get('/data:id', [authMiddleware], CourseDetailController.getCourseInfo);
courseRoutes.patch('/update:id', [authMiddleware], CourseDetailController.update);

export default courseRoutes;