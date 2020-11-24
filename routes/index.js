/*
 * index.js
 * SurveyCity
 * 2020-11-09
 */

const express = require("express");
const router = express.Router();

const loginController = require('../controllers/index')

router.get("/", function (req, res, next) {
  res.render("index", { title: "Home - SurveyCity" });
});

// Login
router.get("/login", loginController.displayLoginPage);
router.post("/login", loginController.processLoginPage);

// Logout
router.get('/logout', loginController.performLogout);


module.exports = router;
