import { getCustomRepository } from "typeorm";
import { SurveyUsersRepository } from "../repositories/SurveysUsersRepository";
import { Request, Response } from 'express';
import { AppError } from "../errors/AppErros";

class AnswerController {

    //http://localhost:3333/answers/1?u=d5d90208-1e88-411b-b567-41edd352735b

    async execute(request: Request, response: Response) {

        // Route params => São paramentros que compõe a rota.
        // Query params => Busca, Paginação. Composição: Chave=valor

        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveyUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u),
        });

        if (!surveyUser) {
            throw new AppError("Survey User does not Exists!");

        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);

    }
}

export { AnswerController }