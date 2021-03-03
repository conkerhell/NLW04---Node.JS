import { getCustomRepository, IsNull, Not } from "typeorm"
import { SurveyUsersRepository } from "../repositories/SurveysUsersRepository"
import { Request, Response } from "express";

class NpsController {

    async execute(request: Request, response: Response) {

        const { survey_id } = request.params;
        const surveysUsersRepository = getCustomRepository(SurveyUsersRepository);

        const surveyUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull()),
        })

        const detractor = surveyUsers.filter(survey =>


            (survey.value >= 0 && survey.value <= 6)

        ).length;

        const passive = surveyUsers.filter(survey =>


            (survey.value >= 7 && survey.value <= 8)

        ).length;

        const promoters = surveyUsers.filter(survey =>

            (survey.value >= 9 && survey.value <= 10)
        ).length;

        const totalAnswers = surveyUsers.length;

        //Formula de NPS
        const calculate = Number(((promoters - detractor) / totalAnswers) * 100).toFixed(2);

        return response.json({
            detractor,
            promoters,
            passive,
            totalAnswers,
            nps: calculate
        });


    }
}

export { NpsController }