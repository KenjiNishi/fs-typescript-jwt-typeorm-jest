import { getConnection, getRepository } from 'typeorm';
import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';
import Candidate from '../models/Candidate';

let token : string;

describe("Testing Candidate Table",()=>{
    beforeAll(async ()=>{
        const connection = await createConnection();
        await connection.runMigrations();

        await request(app).post("/api/recruiters/create/").send({
            email: "tester@exa.com",
            password: "testing",
        });

        let login = await request(app).post("/api/recruiters/auth/")
        .send({
            email: "tester@exa.com",
            password: "testing",
        })
        token = login.body.token;
    });

    afterAll(async ()=>{
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    })

    it("Should be able to create a new Candidate", async ()=>{
        const response = await request(app).post("/api/candidates/create/").send({
            name: "Tester Testerson",
            email: "initial@bestmail.lol",
            dob: "2002-01-01T23:28:56.782Z",
            linkedin:"linked.in/defuser",
            techs:["Javascript", "NodeJs", "React"]
        }).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
        }) 
    
    
    it("Should not be able to create a new Candidate with existing email", async ()=>{
        const response = await request(app).post("/api/candidates/create/").send({
            name: "Misterious duplicate",
            email: "initial@bestmail.lol",
            dob: "2001-04-01T21:12:42.782Z",
            linkedin:"linked.in/",
            techs:["C#", "PHP", "Ionic"]
        }).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(409);
        }) 

    it("Should be able to get Candidate info using ID", async ()=>{
        const repository = getRepository(Candidate);
        const candidate = await repository.findOne({where: {name : "Tester Testerson"}});

        const response = await request(app).get(`/api/candidates/get/${candidate.id}`)
        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200);
        }) 
    
    it("Should be able to get Candidate list", async ()=>{
        const response = await request(app)
        .get(`/api/candidates/list/`)
        .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        }) 

    it("Should be able to update a Candidate using ID", async ()=>{
        const repository = getRepository(Candidate);
        const candidate = await repository.findOne({where: {name : "Tester Testerson"}});

        const updated = await request(app).put(`/api/candidates/update/${candidate.id}`).send({
            email: "updated@bestmail.lol",
            linkedin:"linked.in/therealaddress",
            techs:["Javascript", "NodeJs", "React", "C#", "PHP", "Ionic"]
        }).set('Authorization', `Bearer ${token}`);
        expect(updated.status).toBe(200);
        }) 
    
    it("Should be able to delete a Candidate using ID", async ()=>{
        const repository = getRepository(Candidate);
        const candidate = await repository.findOne({where: {name : "Tester Testerson"}});

        const response = await request(app).delete(`/api/candidates/delete/${candidate.id}`)
        .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        }) 
});