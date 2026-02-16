import { Repository } from "typeorm";
import { SurveyUser } from "../models/SurveyUser";
import { AppDataSource } from "../database/data-source";
class SurveysUsersRepository extends Repository<SurveyUser> {

}

export default AppDataSource.getRepository(SurveyUser).extend(SurveysUsersRepository.prototype);