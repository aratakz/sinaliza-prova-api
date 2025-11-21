import {Router} from 'express';
import {controller} from '../../controller/CourseDetailController';
import authMiddleware from '../../middleware/AuthMiddlware';

export const router = Router();

router.get('/data:id', [authMiddleware], controller.getCourseInfo);
router.patch('/update:id', [authMiddleware], controller.update);

