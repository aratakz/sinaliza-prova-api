import {Router} from 'express';
import {controller}  from '../controller/users/UserController';
import authMiddleware from '../middleware/AuthMiddlware';
import {router as students} from './users/students';
import {router as professionals} from './users/professionals';


export const router = Router();

    router.get('/', controller.getAll);
    router.get('/userdata/:userId', [authMiddleware], controller.getInfo);
    router.get('/checkUsername/:username', controller.checkUsername);

    router.post('/avatarLink/', [authMiddleware], controller.getAvatar);
    router.post('/updateAvatar/:userId', [authMiddleware], controller.updateAvatar);
    router.post('/create',  [authMiddleware], controller.create);

    router.patch('/update/:id', [authMiddleware], controller.update);

    router.use('/students', students);
    router.use('/professionals', professionals);

