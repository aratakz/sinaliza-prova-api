import {Router} from 'express';
import UsersController  from '../controller/UserController';
import authMiddleware from '../middleware/AuthMiddlware';
import ProfessionalController from "../controller/ProfessionalController";


const usersRoutes = Router();

usersRoutes.get('/', UsersController.index);
usersRoutes.post('/avatarLink/', [authMiddleware], UsersController.getAvatar);

usersRoutes.get('/userdata/:userId', [authMiddleware], UsersController.getUserInfo);
usersRoutes.get('/checkUsername/:username', UsersController.checkUsername);

usersRoutes.post('/create',  [authMiddleware], UsersController.register);
usersRoutes.patch('/update/:id', [authMiddleware], UsersController.updateUser);

usersRoutes.get('/students', UsersController.getAllStudents);
usersRoutes.get('/students/:id', UsersController.findById);
usersRoutes.delete('/students/remove/:id', UsersController.remove);
usersRoutes.patch('/students/update/:id', UsersController.update);


usersRoutes.post('/professionals/create', [authMiddleware], ProfessionalController.create);

export default usersRoutes;