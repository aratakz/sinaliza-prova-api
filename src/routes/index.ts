import { Router } from "express";
import usersRoutes from "./users";
import authRoutes from "./auth";
import instituteRoutes from "./institute";

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/auth', authRoutes);
routes.use('/institutes', instituteRoutes);

export default routes;