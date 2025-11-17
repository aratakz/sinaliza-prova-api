import {Request, Response} from "express";
import {CreateExamDTO} from "../domain/avaluation/dto/CreateExamDTO";
import {ExamDomain} from "../domain/avaluation/ExamDomain";

class ExamController {
    async register(request: Request, response: Response)  {
        try {
            if (!request.body) {
                throw Error('No body is present');
            }
            const domain = new ExamDomain();
            await domain.create(new CreateExamDTO(request.body))
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).send({message: error.message});
            }
        }
    }
}

export default new ExamController();