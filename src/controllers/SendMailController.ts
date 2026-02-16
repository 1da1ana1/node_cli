import { Request, Response } from "express";
import { resolve } from "path";
import UserRepository from "../repositories/UserRepository";
import SurveysRepository from "../repositories/SurveysRepository";
import SurveysUsersRepository from "../repositories/SurveysUsersRepository";
import SendMailService from "../services/SendMailService";
import { AppDataSource } from "../database/data-source"; // Adicione se precisar usar repositórios diretos

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

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");
        
        const surveyUserAlreadyExists = await SurveysUsersRepository.findOne({
            where: { user_id: userAlreadyExists.id, survey_id: surveyAlreadyExists.id },
            relations: ["user", "survey"],
        });

        // Objeto de variáveis que vai para o HTML
        const variables = {
            name: userAlreadyExists.name,
            title: surveyAlreadyExists.title,
            description: surveyAlreadyExists.description,
            id: "", // Vamos usar 'id' para passar o ID do SurveyUser
            link: process.env.URL_MAIL,
        };

        if (surveyUserAlreadyExists) {
            variables.id = surveyUserAlreadyExists.id; // <--- Preenche o ID aqui
            await SendMailService.execute(email, surveyAlreadyExists.title, variables, npsPath);
            return res.json(surveyUserAlreadyExists);
        }

        const surveyUser = SurveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id,
        });

        await SurveysUsersRepository.save(surveyUser);

        variables.id = surveyUser.id; // <--- Preenche o ID aqui

        await SendMailService.execute(email, variables.title, variables, npsPath);

        return res.json(surveyUser);
    }
}

export default SendMailController;