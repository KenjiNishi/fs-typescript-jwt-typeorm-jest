import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Candidate from "../models/Candidate";

class CandidateController{
    async create(req: Request, res: Response){
        const repository = getRepository(Candidate);
        const {name, email, dob, linkedin, techs } = req.body;

        const recruiterExists = await repository.findOne({where: {email}});
        if(recruiterExists){
            return res.sendStatus(409).json({message:"Candidate with this email already exists."});
        }

        const candidate = repository.create({name, email, dob, linkedin, techs});
        
        await repository.save(candidate);
        return res.status(200).json(candidate);
    }

    async list(req: Request, res: Response){
        const repository = getRepository(Candidate);

        const candidates = await repository.find();
    
        res.status(200).json(candidates);
    }
}
export default new CandidateController();