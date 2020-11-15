/*
 * survey.js
 * SurveyCity
 * 2020-11-09
 */

const express = require("express");
const router = express.Router();

const Survey = require("../models/survey");
const SurveyQuestion = require("../models/survey-question");

router.get("/", function (req, res) {
  Survey.find((err, survey) => {
    if (err)
      throw err;

    res.render("survey/list", {
      title: "Survey List",
      surveys: survey
    });
  });
});

router.get("/add", function (req, res) {
  res.render("survey/edit", {
    title: "New Survey - SurveyCity",
    survey: new Survey(),
    isNew: true,
  });
});

router.get("/:id", function (req, res) {
  const { id } = req.params;

  Survey.findById(id, (err, survey) => {
    if (err)
      throw err;

    res.render("survey/edit", {
      title: "Edit Survey - SurveyCity",
      survey,
      isNew: false,
    });
  }).populate("questions");
});

router.post("/:id", function (req, res) {
  const { id } = req.params;

  //console.log(req.body);
  //return res.redirect("/survey/" + id);

  if (id === "add") {
    const questions = mapBodyToSurveyQuestions(req.body);
    SurveyQuestion.insertMany(questions, (err, quests) => {
      if (err)
        throw err;

      Survey.create({
        title: req.body.title,
        description: req.body.description,
        questions: quests.map(q => q._id),
      }, (err, survey) => {
        if (err)
          throw err;

        req.flash("success", "Survey saved successfully!");
        res.redirect("/survey/" + survey._id);
      });
    });

    return;
  }

  Survey.findById(id, (err, survey) => {
    if (err)
      throw err;

    SurveyQuestion.remove({ _id: { $in: survey.questions } }, err => {
      if (err)
        throw err;

      const questions = mapBodyToSurveyQuestions(req.body);
      SurveyQuestion.insertMany(questions, (err, quests) => {
        if (err)
          throw err;

        Survey.updateOne({ _id: id }, {
          _id: id,
          title: req.body.title,
          description: req.body.description,
          questions: quests.map(q => q._id),
        }, err => {
          if (err)
            throw err;

          req.flash("success", "Survey saved successfully!");
          res.redirect("/survey/" + id);
        });
      });
    });
  });
});

router.get("/:id/delete", function (req, res) {
  const { id } = req.params;

  Survey.findById(id, (err, survey) => {
    if (err)
      throw err;

    SurveyQuestion.remove({ _id: { $in: survey.questions } }, err => {
      if (err)
        throw err;

      Survey.remove({ _id: id }, err => {
        if (err)
          throw err;

        res.redirect("/survey");
      });
    });
  });
});

module.exports = router;

function mapBodyToSurveyQuestions(body) {
  const questions = [];

  for (let i = 0; i < body.question_title.length; i++) {
    if (!body.question_title[i].trim())
      continue;

    questions.push(new SurveyQuestion({
      question: body.question_title[i].trim(),
      type: body.question_type[i],
      options: body.question_options[i].split(";").map(x => x.trim()),
    }));
  }

  return questions;
}
