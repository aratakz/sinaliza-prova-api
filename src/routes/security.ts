import {Router} from "express";
import {router as auth} from "./security/auth";

export const router  = Router();
router.use('/auth', auth);