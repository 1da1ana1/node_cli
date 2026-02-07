import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path"; 

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: process.env.NODE_ENV === "test" 
    ? path.resolve(__dirname, "database.test.sqlite") 
    : path.resolve(__dirname, "database.sqlite"),
  synchronize: false,
  logging: false,
  entities: [
    path.resolve(__dirname, "..", "models", "*.{ts,js}")
  ],
  migrations: [
    path.resolve(__dirname, "migrations", "*.{ts,js}")
  ],
});