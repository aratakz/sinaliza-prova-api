import {Router} from "express";
import DisciplineController from "../controller/DisciplineCotroller";
import AuthMiddlware from "../middleware/AuthMiddlware";
import CurriculumController from "../controller/CurriculumController";


const curriculumRoutes = Router();

curriculumRoutes.get('/:id', [AuthMiddlware], CurriculumController.getByDisciplineId);

export default curriculumRoutes;