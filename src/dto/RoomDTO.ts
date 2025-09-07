import {Student} from "../models/entity";

export type RoomDTO = {
    name: string;
    students?: Student[];
}