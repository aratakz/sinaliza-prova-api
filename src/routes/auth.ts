import { Router } from "express";
import AuthController  from "../controller/AuthController";
import authMiddleware from "../middleware/AuthMiddlware";



const authRoutes = Router();

authRoutes.post('/signin', AuthController.signin);
authRoutes.post('/register', AuthController.register);
authRoutes.post('/requestPassChange', AuthController.requestPassChange);
authRoutes.delete('/logout', AuthController.logout);


export default authRoutes;