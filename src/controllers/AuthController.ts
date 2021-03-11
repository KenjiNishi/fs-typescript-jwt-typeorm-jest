import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Recruiter from "../models/Recruiter";

class AuthController{
    async authenticate(req: Request, res: Response){
        const repository = getRepository(Recruiter);
        const {email, password} = req.body;

        const recruiter = await repository.findOne({where: {email}});
        if(!recruiter){
            return res.status(400)
            .json({message:"Recruiter with this email does not exist."});
        }

        const validPassword = await bcrypt.compare(password, recruiter.password);
        if(!validPassword){
            return res.status(401)
            .json({message:"Incorrect password!"});
        }

        const token = jwt.sign(
            {id: recruiter.id},
            process.env.TOKEN_SECRET,
            {expiresIn : '1h'}
        )
        delete recruiter.password;

        return res.status(200)
        .json({
            recruiter,
            token,
        });
    }
}
export default new AuthController();