import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Survey } from "../models/Survey";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite",
  synchronize: true,
  logging: false,
  entities: [User, Survey],
  migrations: [],
  subscribers: [],
});
