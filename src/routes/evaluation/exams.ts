import {Router} from 'express';
import AuthMiddlware from "../../middleware/AuthMiddlware";
import {controller} from "../../controller/evaluation/ExamController";


export const router = Router();

router.post('/create', [AuthMiddlware], controller.create);
router.get('/list', [AuthMiddlware], controller.getAll);
router.get('/find/:id', [AuthMiddlware], controller.getById);
router.delete('/remove/:id', [AuthMiddlware], controller.remove);

