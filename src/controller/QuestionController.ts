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
            if (request.body.file) {
                for (const file of request.body.file) {}
            }
            response.json({message: 'created!'});
        } catch (error) {
            if (error instanceof Error) {
                response.status(400).json({error: error.message});
            }
        }
    }

    async list(request: Request, response: Response) {
        try {
            const domain = new QuestionDomain();
            response.json(await domain.getAll());
        } catch (error) {
            if (error instanceof Error) {
                response.status(400).json({error: error.message});
            }
        }
    }

    async remove(request: Request, response: Response) {
        try {
            if (!request.params.id) {
                throw new Error("Id is not provided");
            }
            const domain = new QuestionDomain();
            await domain.remove(request.params.id);
            response.json({message: 'deleted!'});
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({error: error.message});
            }
        }
    }

    async update(request: Request, response: Response) {}

    async findOne(request: Request, response: Response) {
        if (!request.params.id) {
            throw new Error("Id is not provided");
        }

        const domain = new QuestionDomain();
        response.json(await domain.findOne(request.params.id));
    }
}

export default new QuestionController();