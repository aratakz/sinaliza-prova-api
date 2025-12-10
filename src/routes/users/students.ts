import {Router} from "express";
import {controller} from "../../controller/users/StudentsController";

export const router = Router();

router.get('/getAll', controller.getAll);
router.get('/:id', controller.findById);
router.delete('/remove/:id', controller.remove);
router.patch('/update/:id', controller.update);

