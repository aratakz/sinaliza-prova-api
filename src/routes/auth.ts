import { Router } from "express";
import AuthController  from "../controller/AuthController";

const authRoutes = Router();

authRoutes.get('/checkTwoFactorToken/:token', AuthController.checkTwoFactorToken);

authRoutes.patch('/activate/:token', AuthController.activateUser);

authRoutes.post('/signin', AuthController.signin);
authRoutes.post('/register', AuthController.register);
authRoutes.post('/requestPassChange', AuthController.requestPassChange);

authRoutes.delete('/logout', AuthController.logout);


export default authRoutes;