import { Request, Response } from 'express';
import SurveysRepository from '../repositories/SurveysRepository'; 

class SurveysController {
  async create(req: Request, res: Response) {
    const { title, description } = req.body;
    
    const surveys = SurveysRepository.create({ title, description });
    await SurveysRepository.save(surveys);

    return res.status(201).json(surveys);
  }
}

export { SurveysController };