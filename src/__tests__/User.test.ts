import request from 'supertest';
import { app } from '../app';
import { AppDataSource } from '../database/data-source';

describe("Users", () => {
beforeAll(async () => {
        // Inicializa a conexão se não estiver ativa
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
        }

        // Isso apaga todas as tabelas e dados antes de recriar
        await AppDataSource.dropDatabase(); 
        
        // Recria as tabelas do zero
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


    it("Should not be able to create a user with an email that already exists", async () => {
    const response = await request(app).post("/users").send({
                email: "user@example.com",
                name: "User Example",
            });
         expect(response.status).toBe(400);
    });
});
