import {Request, Response} from "express";
import {RoomDomain} from "../domain/Room";

export class RoomController {

    async list(request: Request, response: Response) {
        try {
            const domain = new RoomDomain();
            response.json(await domain.list());
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({message: error.message});
            }
        }
    }
}

export default new RoomController();