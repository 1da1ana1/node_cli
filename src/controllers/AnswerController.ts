import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { SurveyUser } from "../models/SurveyUser"; // <--- CERTIFIQUE-SE QUE ESTÁ ESCRITO CORRETO (SurveyUser)

class AnswerController {
    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        console.log("AnswerController acionado. Token:", u, "Nota:", value);

        // Verifica se o token 'u' chegou
        if (!u) {
             return response.status(400).json({ error: "Token de usuário não fornecido na URL!" });
        }

        // Pega o repositório padrão da entidade
        const surveyUsersRepository = AppDataSource.getRepository(SurveyUser);

        const surveyUser = await surveyUsersRepository.findOne({
            where: { id: String(u) },
        });

        if (!surveyUser) {
            console.log("Erro: SurveyUser não encontrado no banco para o ID:", u);
            return response.status(400).json({ error: "Survey User does not exist" });
        }

        // Salva a nota
        surveyUser.value = Number(value);
        await surveyUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export { AnswerController };