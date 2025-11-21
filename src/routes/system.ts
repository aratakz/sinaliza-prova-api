import {Router} from "express";
import {router as media} from "./system/media";

export const router = Router();


router.use('/media', media);
