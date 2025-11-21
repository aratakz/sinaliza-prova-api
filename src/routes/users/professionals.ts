import {Router} from "express";
import authMiddleware from "../../middleware/AuthMiddlware";
import ProfessionalController from "../../controller/users/ProfessionalController";

export const  router = Router();
    router.post('/professionals/create', [authMiddleware], ProfessionalController.create);
