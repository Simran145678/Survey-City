var express = require("express");
var router = express.Router();

// define the survey model
let survey = require('../models/survey');

router.get("/", function(req, res, next) {
 survey.find( (err, survey) => {
  if (err) {
   return console.error(err);
  }
  else {
   res.render('survey/list', {
    title: 'Survey List',
    survey: survey
   });
  }
 });

});


router.get("/:id", function(req, res, next) {
  // TODO: implement this
  res.send("respond with a resource");
});

router.post("/:id", function(req, res, next) {
  // TODO: implement this
  res.send("respond with a resource");
});

router.get("/:id/delete", function(req, res, next) {
  // TODO: implement this
  res.send("respond with a resource");
});

module.exports = router;
