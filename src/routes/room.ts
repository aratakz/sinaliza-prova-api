import {Router} from "express";
import AuthMiddlware from "../middleware/AuthMiddlware";
import RoomController from "../controller/RoomController";


const  roomRoutes = Router();

roomRoutes.get('/', [AuthMiddlware], RoomController.list);
roomRoutes.get('/:id', [AuthMiddlware], RoomController.findOne);
roomRoutes.delete('/:id', [AuthMiddlware], RoomController.remove);
roomRoutes.post('/register', [AuthMiddlware], RoomController.register);
roomRoutes.patch('/update/:id', [AuthMiddlware], RoomController.update);

export default roomRoutes;