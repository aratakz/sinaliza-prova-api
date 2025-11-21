import { Router } from "express";
import AuthController  from "../../controller/security/AuthController";

export const router = Router();

router.get('/checkTwoFactorToken/:token', AuthController.checkTwoFactorToken);
router.get('/checkAuthToken/:token', AuthController.checkAuthToken);
router.patch('/activate/:token', AuthController.activateUser);
router.patch('/updatePass/:token', AuthController.updatePass);
router.post('/signin', AuthController.signin);
router.post('/student/firstLogin', AuthController.studentFirstLogin);
router.post('/requestPassChange', AuthController.requestPassChange);
router.delete('/logout', AuthController.logout);


