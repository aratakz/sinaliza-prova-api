import {Router} from "express";
import AuthMiddlware from "../../middleware/AuthMiddlware";
import {controller} from "../../controller/management/CurriculumController";


export const router = Router();

router.get('/:id', [AuthMiddlware], controller.getByDisciplineId);

