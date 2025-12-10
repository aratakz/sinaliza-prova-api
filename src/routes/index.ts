import { Router } from "express";
import {router as security} from "./security";
import {router as users} from "./users";
import {router as system} from "./system";
import {router as management} from "./management";

import {router as evaluation} from "./evaluation";
import AuthMiddlware from "../middleware/AuthMiddlware";
import {controller as question} from "../controller/evaluation/QuestionController";
import {router} from "./system/media";

const routes = Router();

routes.use('/users', users);
routes.use('/security', security);
routes.use('/evaluation', evaluation);
routes.use('/system', system);
routes.use('/management', management);
router.get('/system/media/option/video/:id', [AuthMiddlware], question.loadOptionVideo);


export default routes;