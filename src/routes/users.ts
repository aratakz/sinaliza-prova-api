import {Router} from 'express';
import UsersController  from '../controller/UserController';


const UsersRoutes = Router();

UsersRoutes.get('/', UsersController.index);


export default UsersRoutes;