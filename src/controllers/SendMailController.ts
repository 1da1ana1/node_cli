import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository"; // Importe o repositório
import SurveysRepository from "../repositories/SurveysRepository"; // Importe o repositório
import SurveysUsersRepository  from "../repositories/SurveysUsersRepository"; // Importe o repositório

class SendMailController {
    async execute(req: Request, res: Response) {
        const { email, survey_id } = req.body;

        const userAlreadyExists = await UserRepository.findOne({ where: { email } });
        
        if (!userAlreadyExists) {
            return res.status(400).json({ error: "User does not exist" });
        }

        const surveyAlreadyExists = await SurveysRepository.findOneBy({ id: survey_id });
        
        if (!surveyAlreadyExists) {
            return res.status(400).json({ error: "Survey does not exist" });
        }

        const surveyUser = await SurveysUsersRepository.create({
        user_id: userAlreadyExists.id,
        survey_id
        })

        await SurveysUsersRepository.save(surveyUser);

        // Enviar email para usuário
        return res.json(surveyUser);
        // Template email
    }
}

export default SendMailController;