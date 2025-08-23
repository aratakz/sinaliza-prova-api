import {Request, Response} from "express";
import {Security} from "../domain/Security";
import * as httpLang  from './../server/http_codes'
import {AuthException} from "../domain/exception/AuthExceptoion";

const security = new Security();

const authMiddleware = async (req:Request, res:Response, next:any) => {
    try {
        if (!req.headers.authorization) {
            res.status(httpLang.UNAUTHORIZED).send({message: 'Authentication failed 1'});
        }
        const token = req.headers.authorization?.split('Bearer ');
        if (!token || !token[1]) {
            res.status(httpLang.UNAUTHORIZED).send({message: 'Authentication failed'});
        }
        // @ts-ignore
        if (!await security.isValidToken(token[1])) {
            res.status(httpLang.UNAUTHORIZED).send({message: 'Authentication failed 3'});

        }
        next();
    } catch (error) {
        res.status(401).json({message: 'invalid token'});
    }
}

export default authMiddleware;