import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { SurveyUser } from "../models/SurveyUser"; // <--- CERTIFIQUE-SE QUE ESTÁ ESCRITO CORRETO (SurveyUser)
import SurveysUsersRepository from "../repositories/SurveysUsersRepository";
import { Not, IsNull } from "typeorm";

class NpsController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;
    const surveyUserRepository = AppDataSource.getRepository(SurveyUser);

    const surveysUsers = await SurveysUsersRepository.find({
      where: { survey_id: Array.isArray(survey_id) ? survey_id[0] : survey_id, value: Not(IsNull()) },
    });

    const detractors = surveysUsers.filter(
      (survey) => survey.value >= 0 && survey.value <= 6,
    ).length;
    const promoters = surveysUsers.filter(
      (survey) => survey.value >= 9 && survey.value <= 10,
    ).length;
    const passives = surveysUsers.filter(
      (survey) => survey.value >= 7 && survey.value <= 8,
    ).length;
    const totalAnswers = surveysUsers.length;

    const nps = Number(
      (((promoters - detractors) / totalAnswers) * 100).toFixed(2),
    );
    return response.json({
      detractors,
      promoters,
        passives,
        totalAnswers,
        nps,
    });
  }
}

export { NpsController };
