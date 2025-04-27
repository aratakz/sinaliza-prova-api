import { Router } from "express";
import AuthController  from "../controller/AuthController";
import authMiddleware from "../middleware/AuthMiddlware";



const authRoutes = Router();

authRoutes.post('/signin',AuthController.signin);

export default authRoutes;