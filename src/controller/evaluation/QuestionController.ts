import {Request, Response} from "express";
import {QuestionDomain} from "../../domain/Question";

class QuestionController {
    async register(request: Request, response: Response) {
        try {
            if (!request.body) {
                throw new Error("Body is not provided");
            }
            const domain = new QuestionDomain();
            await domain.register(request.body);
            response.json({message: 'created!'});
        } catch (error) {
            if (error instanceof Error) {
                response.status(400).json({error: error.message});
            }
        }
    }
    async getAll(request: Request, response: Response) {
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
    async update(request: Request, response: Response) {
        try {
            if (!request.params.id) {
                throw new Error("Id is not provided");
            }

            if (!request.body) {
                throw new Error("Body is not provided");
            }

            const domain = new QuestionDomain();
            await domain.update(request.params.id, request.body)
            response.json({message: 'updated!'});
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({message: error.stack});
            }
        }
    }
    async findOne(request: Request, response: Response) {
        if (!request.params.id) {
            throw new Error("Id is not provided");
        }

        const domain = new QuestionDomain();
        response.json(await domain.findOne(request.params.id));
    }
    async search(request: Request, response: Response) {
        try {
            if (request.query.search && typeof request.query.search == 'string') {
            const domain = new QuestionDomain();
            response.json(await domain.findByTitle(request.query.search))
            } else {
                response.json([]);
            }
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({error: error.message});
            }
        }
    }
    async saveFieldVideo (request: Request, response: Response) {
        try {
            if (!request.body) {
                throw Error('no body');
            }
            const domain = new QuestionDomain();
            const media = await domain.saveFieldVideo(request.body);
            response.json({
                message: "saved",
                media: media.id})

        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({message: error.message})
            }
        }
    }
    async removeVideo(request: Request, response: Response) {
        try {
            if (!request.body) {
                throw new Error('No body is present');
            }
            if (!request.body.link) {
                throw new Error('no media link is provided');
            }
            const domain = new QuestionDomain();
            await domain.removeFieldVideo(request.body.link);
            response.json({message: 'deleted'})
        } catch (e) {
            if (e instanceof Error) {
                response
                    .status(500)
                    .json({message: e.message});
            }
        }
    }
    async loadFieldVideo (request: Request, response: Response) {
        try {
            if (!request.params.id) {
                throw Error('no id is present');
            }
            const domain = new QuestionDomain();
            response.json({video: await domain.getFieldVideo(request.params.id)});

        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({message: error.message})
            }
        }
    }
    async saveQuestionImage(request: Request, response: Response){
        try {
            if (!request.body) {
                throw new Error('no body is present');
            }

            const domain = new QuestionDomain();
            const images = await domain.addImages(request.body);
            response.json({'message': 'Created!', id: images})
        } catch (e) {
            if (e instanceof Error) {
                response.status(500).json({message: e.message})
            }
        }
    }

}

export const controller = new QuestionController();