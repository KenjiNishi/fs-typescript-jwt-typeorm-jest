import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Recruiter from "../models/Recruiter";

class RecruiterController{
    async create(req: Request, res: Response){
        const repository = getRepository(Recruiter);
        const {email, password} = req.body;

        const recruiterExists = await repository.findOne({where: {email}});
        if(recruiterExists){
            return res.sendStatus(409);
        }

        const recruiter = repository.create({
            email,
            password
        })
        
        await repository.save(recruiter);
        return res.status(200).json(recruiter);
    }
}
export default new RecruiterController();