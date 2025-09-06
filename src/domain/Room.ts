import {RoomRepository} from "../repository/RoomRepository";


export class  RoomDomain {

    private roomRepository: RoomRepository = new RoomRepository();

    async list () {
        return await this.roomRepository.findAll();
    }
}