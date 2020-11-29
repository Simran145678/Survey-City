/*
 * _main.js
 * SurveyCity
 * 2020-11-09
 */

const router = require("express").Router();
// const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn("/login");

router.use("/", require("./index"));
router.use("/survey", require("./survey"));
router.use("/answer", require("./answer"));

router.use("/register", require("./register"));
router.use("/login", require("./login"));
router.get("/logout", require("./logout"));

module.exports = router;
