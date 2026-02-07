import request from 'supertest';
import { app } from '../app';
import { AppDataSource } from '../database/data-source';

describe("Users", () => {
    beforeAll(async () => {
        process.env.NODE_ENV = 'test'; 
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();
    });

    afterAll(async () => {
        await AppDataSource.destroy();
    });

    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/users").send({
            email: "user@example.com",
            name: "User Example"
        });

        expect(response.status).toBe(201);
    });
});