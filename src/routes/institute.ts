import {Router} from "express";
import InstituteController from "../controller/InstituteController";


const  instituteRoutes = Router();

instituteRoutes.get('/', InstituteController.index);

export default instituteRoutes;