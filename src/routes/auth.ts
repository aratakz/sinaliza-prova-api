import { Router } from "express";
import AuthController  from "../controller/AuthController";

const authRoutes = Router();

authRoutes.get('/checkTwoFactorToken/:token', AuthController.checkTwoFactorToken);
authRoutes.get('/checkAuthToken/:token', AuthController.checkAuthToken);
authRoutes.patch('/activate/:token', AuthController.activateUser);
authRoutes.patch('/updatePass/:token', AuthController.updatePass);
authRoutes.post('/signin', AuthController.signin);
authRoutes.post('/student/firstLogin', AuthController.studentFirstLogin);
authRoutes.post('/requestPassChange', AuthController.requestPassChange);
authRoutes.delete('/logout', AuthController.logout);


export default authRoutes;