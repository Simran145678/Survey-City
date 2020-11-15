const express = require("express");
const router = express.Router();

const Survey = require("../models/survey");

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
  });
});

router.post("/:id", function (req, res) {
  const { id } = req.params;

  if (id === "add") {
    console.log("Add!", req.body);
    Survey.create({
      title: req.body.title,
      description: req.body.description,
    }, (err, survey) => {
      console.log(err, survey);
      if (err)
        throw err;

      // TODO: questions

      res.redirect("/survey");
    });

    return;
  }

  Survey.updateOne({ _id: id }, {
    _id: id,
    title: req.body.title,
    description: req.body.description,
  }, err => {
    if (err)
      throw err;

    // TODO: questions

    res.redirect("/survey");
  });
});

router.get("/:id/delete", function (req, res) {
  const id = req.params.id;

  // TODO: questions

  Survey.remove({ _id: id }, err => {
    if (err)
      throw err;

    res.redirect("/survey");
  });
});

module.exports = router;
