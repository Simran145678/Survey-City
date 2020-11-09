/*
 * _main.js
 * SurveyCity
 * 2020-11-09
 */

const router = require("express").Router();
const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn("/login");

router.use("/", ensureLoggedIn, require("./index"));
router.use("/users", ensureLoggedIn, require("./users"));

// router.use("/login", require("./login"));
// router.use("/logout", ensureLoggedIn, require("./logout"));
// router.use("/register", require("./register"));

module.exports = router;
