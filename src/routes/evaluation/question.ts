import {Router} from 'express';
import AuthMiddlware from "../../middleware/AuthMiddlware";
import {controller} from "../../controller/evaluation/QuestionController";


export const router = Router();

router.get('/list', [AuthMiddlware], controller.getAll);
router.get('/find/:id', [AuthMiddlware], controller.findOne);
router.get('/search/', [AuthMiddlware], controller.search);

router.post('/register', [AuthMiddlware], controller.register);
router.patch('/update/:id', [AuthMiddlware], controller.update);
router.delete('/:id', [AuthMiddlware], controller.remove);
