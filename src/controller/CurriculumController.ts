import {Request, Response} from "express";
import {DisciplineDomain} from "../domain/Disclipline";
import {CurriculumDomain} from "../domain/Curriculum";

class CurriculumController {

    async getByDisciplineId (request: Request, response: Response) {
        try {
            try {
                if (!request.params.id) {
                    throw new Error('No discipline id was provided!');
                }
                const curriculumDomain = new CurriculumDomain();
                response.json(await curriculumDomain.listByDiscipline(request.params.id));
            } catch (error) {
                if (error instanceof Error) {
                    response.status(500).json({message: error.message});
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).send({message: error.message});
            }
        }
    }
}

export default new CurriculumController();