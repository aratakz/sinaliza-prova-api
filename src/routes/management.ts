import {Router} from "express";
import {router as rooms} from "./management/room"
import {router as course} from "./management/course"
import {router as institute} from "./management/institute"
import {router as discipline} from "./management/discipline"
import {router as curriculum} from "./management/curriculum"

export const router = Router();

router.use('/room', rooms);
router.use('/course', course);
router.use('/institute', institute);
router.use('/discipline', discipline);
router.use('/curriculum', curriculum);
