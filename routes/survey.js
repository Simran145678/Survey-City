var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  // TODO: implement this
  res.send("respond with a resource");
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
