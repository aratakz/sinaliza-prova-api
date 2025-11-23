import {Router} from "express";
import AuthMiddlware from "../../middleware/AuthMiddlware";
import {controller} from "../../controller/management/RoomController";


export const router = Router();

router.get('/', [AuthMiddlware], controller.list);
router.get('/:id', [AuthMiddlware], controller.findOne);
router.delete('/:id', [AuthMiddlware], controller.remove);
router.post('/register', [AuthMiddlware], controller.register);
router.patch('/update/:id', [AuthMiddlware], controller.update);

