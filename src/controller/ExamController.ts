import {Request, Response} from "express";

class ExamController {
    async register(request: Request, response: Response)  {
        try {

        } catch (error) {
            if (error instanceof Error) {
                response.status(500).send({message: error.message});
            }
        }
    }
}

export default new ExamController();