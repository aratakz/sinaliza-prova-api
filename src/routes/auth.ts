import { Router } from "express";
import AuthController  from "../controller/AuthController";



const authRoutes = Router();

authRoutes.post('/signin', AuthController.sigin);

export default authRoutes;