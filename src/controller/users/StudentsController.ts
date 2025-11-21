import {Request, Response} from "express";
import {UserDomain} from "../../domain/users/UserDomain";

class StudentsController {
    async getAll(request: Request, response: Response) {
        try {
            const domain = new UserDomain();
            response.json(await domain.getStudents());
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({message: error.message});
            }
        }
    }
    async findById(request: Request, response: Response) {
        try {
            if (!request.params || !request.params.id) {
                throw new Error('No id is provided!');
            }
            const domain = new UserDomain();
            response.json(await domain.getStudent(request.params.id));
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({message: error.message});
            }
        }
    }
    async update(request: Request, response: Response) {
        try {
            if (!request.params || !request.params.id) {
                response.status(422).json({message: 'No id is provided!'});
            }
            if (!request.body) {
                response.status(422).json({message: 'No body is provided!'});
            }

            const domain: UserDomain = new UserDomain();
            response.json(await domain.updateStudent(request.params.id, request.body));
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({message: error.message});
            }
        }
    }
    async remove(request: Request, response: Response) {
        try {
            if (!request.params || !request.params.id) {
                throw new Error('No id is provided!');
            }
            const domain = new UserDomain();
            await domain.remove(request.params.id);
            response.json({message: 'deleted'})
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({message: error.message});
            }
        }
    }


}

export const controller = new StudentsController();