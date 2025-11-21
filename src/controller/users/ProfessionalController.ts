import {Request, Response} from "express";
import {ProfessionalDomain} from "../../domain/users/Professional";
import {ProfessionalDTO} from "../../dto";

export class ProfessionalController {

    async create(request: Request, response: Response) {
        try {
            const domain = new ProfessionalDomain();
            if (!request.body) {
                throw  new Error("Body is required");
            }
            const user = await domain.create(new ProfessionalDTO(request.body));
            response.json({
                status: "success",
                user: user,
            });
        } catch (e) {
            if (e instanceof Error) {
                response.status(500).json({message: e.message});
            }
            response.status(500).json({message: 'Nao foi possivel crirar o professional'});
        }
    }
}

export default new ProfessionalController();