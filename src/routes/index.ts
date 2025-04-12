import { Router } from "express";
import UsersRoutes from "./users";

const routes = Router();

routes.use('/users', UsersRoutes);

export default routes;