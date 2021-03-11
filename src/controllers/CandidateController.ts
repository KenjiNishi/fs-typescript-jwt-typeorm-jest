import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Candidate from "../models/Candidate";

class CandidateController{
    async create(req: Request, res: Response){
        const repository = getRepository(Candidate);
        const {name, email, dob, linkedin, techs } = req.body;

        const candidateExists = await repository.findOne({where: {email}});
        if(candidateExists){
            return res.status(409).json({message:"Candidate with this email already exists."});
        }

        const candidate = repository.create({name, email, dob, linkedin, techs});
        
        await repository.save(candidate);
        return res.status(201).json(candidate);
    }

    async list(req: Request, res: Response){
        const repository = getRepository(Candidate);
        const candidates = await repository.find();
        res.status(200).json(candidates);
    }

    async getOne(req: Request, res: Response){
        const repository = getRepository(Candidate);
        const {id} = req.params;

        const candidate = await repository.findOne({where: {id}});
        if(!candidate){
            return res.sendStatus(404).json({message:"Candidate id doesn't exist."});
        }
        return res.status(200).json(candidate);
    }

    async update(req: Request, res: Response){
        const repository = getRepository(Candidate);
        const {id} = req.params;
        const {name, email, dob, linkedin, techs } = req.body;

        const candidate = await repository.findOne({where: {id}});
        if(!candidate){
            return res.sendStatus(404).json({message:"Candidate id doesn't exist."});
        }

        if(name){candidate.name = name;}
        if(email){candidate.email = email;}
        if(dob){candidate.dob = dob;}
        if(linkedin){candidate.linkedin = linkedin;}
        if(techs){candidate.techs=techs;}

        await repository.save(candidate);
        return res.status(200).json(candidate);
    }
    
    async delete(req: Request, res: Response){
        const repository = getRepository(Candidate);
        const {id} = req.params;

        const candidate = await repository.findOne({where: {id}});
        if(!candidate){
            return res.sendStatus(404).json({message:"Candidate id doesn't exist."});
        }

        await repository.delete(id);
        return res.status(200).json(candidate);
    }
}
export default new CandidateController();