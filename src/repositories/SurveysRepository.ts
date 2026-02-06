import { Repository } from "typeorm";
import { Survey } from "../models/Survey";
import { AppDataSource } from "../database/data-source";

class SurveysRepository extends Repository<Survey> {}

export default AppDataSource.getRepository(Survey).extend(SurveysRepository);