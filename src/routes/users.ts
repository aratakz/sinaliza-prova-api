import {Router} from 'express';
import UsersController  from '../controller/UserController';
import authMiddleware from '../middleware/AuthMiddlware';


const usersRoutes = Router();

usersRoutes.get('/', UsersController.index);
usersRoutes.get('/userdata/:userId', [authMiddleware], UsersController.getUserInfo);
usersRoutes.get('/checkUsername/:username', UsersController.checkUsername);
usersRoutes.post('/create',  [authMiddleware], UsersController.register);
usersRoutes.patch('/update/:userId', [authMiddleware], UsersController.update);

export default usersRoutes;