/*
 * app.js
 * SurveyCity
 * 2020-11-09
 */

(function () {
  function start() {
    [...document.querySelectorAll(".require-confirmation")].forEach(el => {
      el.addEventListener("click", e => {
        if (!confirm("Are you sure you want to do this?"))
          e.preventDefault();
      });
    });
  }

  window.addEventListener("DOMContentLoaded", start);
})();
