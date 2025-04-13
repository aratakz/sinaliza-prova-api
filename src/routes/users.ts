import {Router} from 'express';
import UsersController  from '../controller/UserController';


const usersRoutes = Router();

usersRoutes.get('/', UsersController.index);


export default usersRoutes;