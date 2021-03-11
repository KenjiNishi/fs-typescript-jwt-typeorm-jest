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

    const [ ,token] = authorization.split(' ');
    try{
        const data = jwt.verify(token, process.env.TOKEN_SECRET);
        const {id} = data as TokenPayload;

        // Saving the ID returned by the token inside the Request Body
        req.body.userId = id;

        return next();

    }catch(err){
        return res.status(401).json(err);
    }

}
export default authMiddleware;