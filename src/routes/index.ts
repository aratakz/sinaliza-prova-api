import { Router } from "express";
import usersRoutes from "./users";
import authRoutes from "./auth";
import courseRoutes from "./course";

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/auth', authRoutes);
routes.use('/course', courseRoutes);

export default routes;