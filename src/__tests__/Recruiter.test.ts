import { getConnection } from 'typeorm';
import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe("Testing Recruiter Table",()=>{
    beforeAll(async ()=>{
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async ()=>{
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    })

    it("Should be able to create a new recruiter", async ()=>{
        const response = await request(app).post("/api/recruiters/create/").send({
            email: "example@exa.com",
            password: "strongpassword",
        });
        expect(response.status).toBe(201);
        }) 
    
    
    it("Should not be able to create a new recruiter with existing email", async ()=>{
        const response = await request(app).post("/api/recruiters/create/").send({
            email: "example@exa.com",
            password: "strongerpassword",
        });
        expect(response.status).toBe(409);
        }) 
    
    it("Should be able to authenticate a recruiter", async ()=>{
        const response = await request(app).post("/api/recruiters/auth/").send({
            email: "example@exa.com",
            password: "strongpassword",
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
        }) 
    
    it("Should not be able to authenticate a recruiter with wrong email", async ()=>{
        const response = await request(app).post("/api/recruiters/auth/").send({
            email: "nonexistent@exa.com",
            password: "doesnteventmatter",
        });
        expect(response.status).toBe(400);
        }) 

    it("Should not be able to authenticate a recruiter with wrong password", async ()=>{
        const response = await request(app).post("/api/recruiters/auth/").send({
            email: "example@exa.com",
            password: "notTheCorrectOne",
        });
        expect(response.status).toBe(401);
        }) 
    
    
});