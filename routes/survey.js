const express = require("express");
const router = express.Router();

const survey = require("../models/survey");

router.get("/", function (req, res) {
  survey.find((err, survey) => {
    if (err)
      throw err;

    res.render("survey/list", {
      title: "Survey List",
      surveys: survey
    });
  });
});


router.get("/:id", function (req, res) {
  // TODO: implement this
  res.send("respond with a resource");
});

router.post("/:id", function (req, res) {
  // TODO: implement this
  res.send("respond with a resource");
});

router.get("/:id/delete", function (req, res) {
  const id = req.params.id;

  survey.remove({ _id: id }, err => {
    if (err)
      throw err;

    res.redirect("/survey");
  });
});

module.exports = router;
