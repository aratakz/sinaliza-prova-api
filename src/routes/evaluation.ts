import {Router} from "express";
import {router as exams} from "./evaluation/exams";
import {router as question} from "./evaluation/question";
import {router as questionOption} from "./evaluation/questionOption";
import {router as questionTags} from "./evaluation/questionTags";

export const router = Router();
router.use('/exams', exams);
router.use('/questions', question);
router.use('/questionOption', questionOption);
router.use('/questionTags', questionTags);
