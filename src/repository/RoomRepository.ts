import {RepositoryInterface} from "./RepositoryInterface";
import {Room} from "../models/entity";
import databaseConfig from "../server/typeorm.conf";

export class RoomRepository implements RepositoryInterface<Room> {
    async findById(id: string): Promise<Room> {
        const results = await databaseConfig.getRepository(Room).find({
            where: {
                id: id
            },
        });
        return results[0];
    }
    findAll(): Promise<Room[]> {
        return databaseConfig.getRepository(Room).find();
    }
    async save(entity: Room): Promise<Room> {
        return await databaseConfig.getRepository(Room).save(entity);
    }
    async remove(room: Room): Promise<void> {
        await databaseConfig.getRepository(Room).remove(room);
    }

}