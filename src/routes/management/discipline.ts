import {Router} from "express";
import {controller} from "../../controller/DisciplineCotroller";
import AuthMiddlware from "../../middleware/AuthMiddlware";


export const router = Router();

router.get('', [AuthMiddlware], controller.getAll);
router.get('/:id', [AuthMiddlware], controller.findOne);
router.patch('/update/:id', [AuthMiddlware], controller.update);
router.post('/create', [AuthMiddlware], controller.register);
router.delete('/remove/:id', [AuthMiddlware], controller.remove);
