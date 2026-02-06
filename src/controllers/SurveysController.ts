import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Survey } from '../models/Survey';

class SurveyController {
  async create(req: Request, res: Response) {
    const { title, description } = req.body;
    const surveysRepository = AppDataSource.getRepository(Survey);
    
    const survey = surveysRepository.create({ title, description });
    await surveysRepository.save(survey);

    return res.status(201).json(survey);
  }
}

export { SurveyController };