const express = require("express");
const router = express.Router();

let passport = require("passport");
const User = require("../models/user")

router.get("/", (req, res, next) => {
  res.render("auth/register", {
    title: "Register",
    messages: req.flash("registerMessage"),
    fullName: req.user ? req.user.fullName : ""
  });
});

router.post("/", (req, res, next) => {
  // instantiate a user object
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    fullName: req.body.displayName,
  });

  User.register(newUser, req.body.password, err => {
    if (err) {
      if (err.name === "UserExistsError")
        req.flash("registerMessage", "Registration error: User already exists.");

      return res.render("auth/register", {
        title: "Register",
        messages: req.flash("registerMessage"),
      });
    }

    passport.authenticate("local")(req, res, () => {
      res.redirect("/survey");
    });
  });
});


module.exports = router;
