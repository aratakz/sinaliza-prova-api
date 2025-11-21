import {Request, Response} from "express";
import {RoomDomain} from "../domain/Room";
import {create} from "node:domain";

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

    async register(request: Request, response: Response): Promise<void> {
        try {
            if (!request.body) {
                throw new Error("No body is provided");
            }
            if (!request.body.name) {
                throw new Error("name field is required");
            }
            const domain = new RoomDomain();
            await domain.create(request.body);
            response.status(201).json({message: 'created'});
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({message: error.message});
            }
        }
    }

    async findOne(request: Request, response: Response): Promise<void> {
        try {
            if (!request.params.id) {
                throw new Error("No id is provided");
            }
            const domain = new RoomDomain();
            response.json(await domain.findById(request.params.id));
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({message: error.message});
            }
        }
    }

    async update(request: Request, response: Response): Promise<void> {
        try {
            if (!request.params.id) {
                throw new Error("No id is provided");
            }
            if (!request.body) {
                throw new Error("No body is provided");
            }
            const domain = new RoomDomain();
            await domain.update(request.params.id, request.body);
            response.json({message: 'updated'});
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({message: error.message});
            }
        }
    }

    async remove(request: Request, response: Response): Promise<void> {
        try {
            if (!request.params.id) {
                throw new Error("No id is provided");
            }
            const domain = new RoomDomain();
            await domain.remove(request.params.id);
            response.json({message: 'deleted'});
        } catch (error) {
            if (error instanceof Error) {
                response.status(500).json({message: error.message});
            }
        }
    }
}

export const controller =  new RoomController();