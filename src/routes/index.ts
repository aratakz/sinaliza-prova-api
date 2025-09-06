import { Router } from "express";
import usersRoutes from "./users";
import authRoutes from "./auth";
import instituteRoutes from "./institute";
import courseRoutes from "./course";
import disciplineRoutes from "./discipline";
import curriculumRoutes from "./curriculum";
import roomRoutes from "./room";

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/auth', authRoutes);
routes.use('/course', courseRoutes);
routes.use('/institutes', instituteRoutes);
routes.use('/disciplines', disciplineRoutes);
routes.use('/curriculum', curriculumRoutes);
routes.use('/room', roomRoutes);

export default routes;