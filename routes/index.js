/*
 * index.js
 * SurveyCity
 * 2020-11-09
 */

const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.render("index", { title: "Home - SurveyCity" });
});

module.exports = router;
