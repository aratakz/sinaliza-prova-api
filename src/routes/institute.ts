import {Router} from "express";
import InstituteController from "../controller/InstituteController";
import authMiddleware from '../middleware/AuthMiddlware';


const  instituteRoutes = Router();

instituteRoutes.get('/', InstituteController.index);
instituteRoutes.get('/find/:id', [authMiddleware], InstituteController.findById);
instituteRoutes.get('/search/:text', InstituteController.findOneByText);

instituteRoutes.post('/create', [authMiddleware], InstituteController.register);

instituteRoutes.put('/update/:id', [authMiddleware], InstituteController.update);


export default instituteRoutes;