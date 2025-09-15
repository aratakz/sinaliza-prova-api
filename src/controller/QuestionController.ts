import {Request, Response} from "express";
import {QuestionDomain} from "../domain/Question";

class QuestionController {

    async register(request: Request, response: Response) {
        try {
            if (!request.body) {
                throw new Error("Body is not provided");
            }

            const domain = new QuestionDomain();
            await domain.register(request.body);
            if (request.body.files) {
            }
            response.json({message: 'created!'});
        } catch (error) {
            if (error instanceof Error) {
                response.status(400).json({error: error.message});
            }
        }
    }
}

export default new QuestionController();