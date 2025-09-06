import {Router} from "express";
import AuthMiddlware from "../middleware/AuthMiddlware";
import RoomController from "../controller/RoomController";


const  roomRoutes = Router();

roomRoutes.get('/', [AuthMiddlware], RoomController.list);

export default roomRoutes;