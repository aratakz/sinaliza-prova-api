import { UserRole } from "../models/enums/UserRole";
import { Request, Response, NextFunction } from 'express';

const autorizeRoles = (...allowedRoles: UserRole[]) => {
    // return (req: Request, res: Response, next: NextFunction) => {
    //     if(!allowedRoles.includes(req.user?.role)) {
    //         return res.status(403).json({message: 'User not authorized!'});
    //     }
    //     next();
    // }
}

module.exports = autorizeRoles;