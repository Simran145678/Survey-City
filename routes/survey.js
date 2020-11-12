var express = require("express");
const survey = require("../models/survey");
var router = express.Router();
let Survey = require('../models/survey')

router.get("/", function(req, res, next) {
    // TODO: implement this
    output = Survey.find((err, surveyList) => {
        if (err) {
            output = err;
        } else {
            output = surveyList;
            res.render('survey/surveyList', { title: 'Survey', SurveyList: surveyList });
        }
    });
});

router.get("/add", function(req, res, next) {
    res.render('survey/addSurvey', {
        title: 'Add Survey',
    })
});

router.post("/add", function(req, res, next) {
    let newSurvey = Survey({
        //"owner": req.body.owner,
        "title": req.body.title,
        "description": req.body.description,
        //"questions": req.body.questions,
    })
    Survey.create(newSurvey, (err, Survey) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the book list
            res.redirect('/survey');
        }
    })
});


router.get("/edit/:id", function(req, res, next) {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {

        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //show the edit view 
            res.render('survey/editSurvey', {
                title: 'Edit Survey',
                Survey: surveyToEdit,

            });
        }
    });
});

router.post("/edit/:id", function(req, res, next) {
    let id = req.params.id;

    let updateSurvey = Survey({
        "_id": id,
        //"owner": req.body.owner,
        "title": req.body.title,
        "description": req.body.description,
        //"questions": req.body.questions,
    });

    Survey.updateOne({ _id: id }, updateSurvey, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the Survey
            res.redirect('/survey');
        }
    });
});

router.get("/delete/:id", function(req, res, next) {
    // TODO: implement this
    let id = req.params.id;

    Survey.remove({ _id: id }, (err) => {

        if (err) {
            console.log(err);
            res.end(err);
        } else {
            // refresh the survey list
            res.redirect('/survey');
        }
    });
});

module.exports = router;