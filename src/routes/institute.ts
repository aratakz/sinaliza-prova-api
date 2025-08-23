import {Router} from "express";
import InstituteController from "../controller/InstituteController";
import authMiddleware from '../middleware/AuthMiddlware';


const  instituteRoutes = Router();

instituteRoutes.get('/', InstituteController.index);
instituteRoutes.post('/create', [authMiddleware], InstituteController.register);
instituteRoutes.get('/find/:id', [authMiddleware], InstituteController.register);

export default instituteRoutes;