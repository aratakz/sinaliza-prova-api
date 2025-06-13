import {Router} from 'express';
import UsersController  from '../controller/UserController';
import authMiddleware from '../middleware/AuthMiddlware';


const usersRoutes = Router();

usersRoutes.get('/', UsersController.index);
usersRoutes.get('/userdata/:userId', [authMiddleware], UsersController.getUserInfo);

export default usersRoutes;