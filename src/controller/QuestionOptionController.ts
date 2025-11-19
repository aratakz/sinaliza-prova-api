import {Request, Response} from "express";
import {QuestionOptionDomain} from "../domain/QuestionOption";

class QuestionOptionController {


    create(request: Request, response: Response) {
        try {

        } catch (error) {
            if (error instanceof Error) {
                response.status(500).send({message: error.message});
            }
        }
    }

    async findByQuestionId(request: Request, response: Response) {
        try {
            const domain = new QuestionOptionDomain();
            response.json(await domain.findByQuestionId(request.params.id));
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).send({message: error.message});
            }
        }
    }
}

export default new  QuestionOptionController();


