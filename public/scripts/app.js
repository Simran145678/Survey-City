const { startSession } = require("mongoose");

(function () {
  function Start() {
    console.log("App started..");
  }
  window.addEventListener("load", Start);
})();
