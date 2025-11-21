import {Router} from "express";
import {controller} from '../../controller/evaluation/QuestionTagsController'

export const router = Router();

router.post('/create', controller.create);