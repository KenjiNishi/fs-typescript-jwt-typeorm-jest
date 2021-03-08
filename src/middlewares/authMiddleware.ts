import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

interface TokenPayload{
    id: string,
    iat: number,
    exp: number
}

function authMiddleware(req: Request, res: Response, next: NextFunction){
    const {authorization} = req.headers;
    if(!authorization){
        return res.sendStatus(401);
    }

    const token = authorization.replace('Bearer', '').trim();
    try{
        const data = jwt.verify(token, process.env.TOKEN_SECRET);
        const {id} = data as TokenPayload;

        //Getting the authenticated user id
        console.log(id);

        return next();

    }catch(err){
        return res.status(401).json(err);
    }

}
export default authMiddleware;