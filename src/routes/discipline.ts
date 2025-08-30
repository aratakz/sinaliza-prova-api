import {Router} from "express";
import DisciplineController from "../controller/DisciplineCotroller";
import AuthMiddlware from "../middleware/AuthMiddlware";


const disciplineRoutes = Router();

disciplineRoutes.get('', [AuthMiddlware], DisciplineController.getAll);
disciplineRoutes.post('/create', [AuthMiddlware], DisciplineController.register);

export default disciplineRoutes;