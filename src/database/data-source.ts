import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path"; 
import { User } from "../models/User";
import { Survey } from "../models/Survey";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: path.resolve(__dirname, "./database.sqlite"), 
  synchronize: true,
  logging: false,
  entities: [User, Survey],
  migrations: [],
  subscribers: [],
});