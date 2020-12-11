const express = require("express");
const router = express.Router();

const Survey = require("../models/survey");
const SurveyResponse = require("../models/survey-response");

router.get("/:surveyId", async function (req, res, next) {
  const { surveyId } = req.params;

  const result = {};
  let survey;

  try {
    survey = await Survey.findOne({
      _id: surveyId,
      owner: req.user._id,
    }).populate("questions").exec();

    const responses = await SurveyResponse.find({
      survey: surveyId,
    }).exec();

    for (const response of responses) {
      for (const answer of response.answers) {
        const qId = answer.question.toString();

        if (!result[qId]?.answers?.push?.(answer.answer))
          result[qId] = {
            question:
              survey.questions.find(q => q._id.toString() === qId)?.question
                ?? "[Unknown question]",
            answers: [
              answer.answer
            ],
          };
      }
    }
  } catch (e) {
    return next(e);
  }

  res.render("responses/list", {
    title: "Survey responses",
    displayName: req.user?.fullName,
    survey,
    answers: Object.values(result),
  });
});

module.exports = router;
