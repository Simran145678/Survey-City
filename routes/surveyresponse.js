


const express = require("express");
const router = express.Router();

const Survey = require("../models/survey");
const SurveyResponse = require("../models/survey-response");


router.get("/:surveyId", async function (req, res) { 	
    const survey = await Survey.findById(req.params.surveyId).populate("questions").exec(); 	
    const responses = await SurveyResponse.find({ survey: req.params.surveyId }).exec(); 	
    const result = {}; 	
    for (const response of responses) { 		
        for (const answer of response.answers) { 			
            if (!(answer.question.toString() in result)) 				
                result[answer.question.toString()] = { 
                    question: survey.questions.find(q => q._id.toString() === answer.question.toString()).question, 
                    answers: [] 
                }; 			
            result[answer.question.toString()].answers.push(answer.answer); 	
        } 	 	
	}
	
	res.render("responses/list", {
		title: "...",
		answers: Object.values(result),
	});
});