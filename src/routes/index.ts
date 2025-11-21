import { Router } from "express";
import {router as security} from "./security";
import {router as users} from "./users";
import {router as system} from "./system";
import {router as management} from "./management";

import {router as evaluation} from "./evaluation";

const routes = Router();

routes.use('/users', users);
routes.use('/security', security);
routes.use('/evaluation', evaluation);
routes.use('/system', system);
routes.use('/management', management);


export default routes;