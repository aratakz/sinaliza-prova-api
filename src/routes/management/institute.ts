import {Router} from "express";
import {controller} from "../../controller/management/InstituteController";
import authMiddleware from '../../middleware/AuthMiddlware';


export const router = Router();

router.get('/', controller.index);
router.get('/find/:id', [authMiddleware], controller.findById);
router.get('/search/:text', controller.findOneByText);
router.post('/create', [authMiddleware], controller.register);
router.put('/update/:id', [authMiddleware], controller.update);
router.delete('/remove/:id', [authMiddleware], controller.remove);


