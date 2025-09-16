import {RoomRepository} from "../repository/RoomRepository";
import {RoomDTO} from "../dto/RoomDTO";
import {Room} from "../models/entity";


export class  RoomDomain {

    private roomRepository: RoomRepository = new RoomRepository();

    async list () {
        return await this.roomRepository.findAll();
    }

    async create (roomDTO: RoomDTO): Promise<void> {
        await this.roomRepository.save(roomDTO);
    }
    async findById(id: string): Promise<Room> {
        return await this.roomRepository.findById(id);
    }
    async update (id: string, roomDTO: RoomDTO): Promise<void> {
        const room = await this.roomRepository.findById(id);
        if (!room) {
            throw new Error("Room not found");
        }
        room.name = roomDTO.name;

        await this.roomRepository.save(room);
    }

    async remove (id: string): Promise<void> {
        const room = await this.roomRepository.findById(id);
        if (!room) {
            throw new Error("Room not found");
        }
        await this.roomRepository.remove(room);
    }
}