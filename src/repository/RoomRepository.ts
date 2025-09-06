import {RepositoryInterface} from "./RepositoryInterface";
import {Room} from "../models/entity";
import databaseConfig from "../server/typeorm.conf";

export class RoomRepository implements RepositoryInterface<Room> {
    findById(id: string): Promise<Room> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Room[]> {
        return databaseConfig.getRepository(Room).find();
    }
    save(entity: Room): Promise<void> {
        throw new Error("Method not implemented.");
    }

}