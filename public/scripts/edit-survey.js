/*
 * edit-survey.js
 * SurveyCity
 * 2020-12-11
 */

 (function () {
  // Because this script is deferred we are guaranteed to execute when DOM has been loaded

  const MULTIPLE_CHOICE_OPTIONS = ["radio", "checkbox"];

  const questionList = document.getElementById("question-list");
  const addButton = document.getElementById("add-question");

  function renumberQuestions() {
    [...questionList.querySelectorAll(".question-header")].forEach((el, i) => {
      el.textContent = `Question ${i + 1}`;
    });
  }

  function addQuestion() {
    const newId = (Date.now() + Math.random()).toString();
    const fragment = document.getElementById("question-template").content.cloneNode(true);

    fragment.querySelector(".question-header").textContent = `Question ${questionList.children.length}`;
    fragment.querySelector(".question-title-label").setAttribute("for", `title-${newId}`);
    fragment.querySelector(".question-title").setAttribute("id", `title-${newId}`);
    fragment.querySelector(".question-type-label").setAttribute("for", `type-${newId}`);
    fragment.querySelector(".question-type").setAttribute("id", `type-${newId}`);
    fragment.querySelector(".question-options-label").setAttribute("for", `options-${newId}`);
    fragment.querySelector(".question-options").setAttribute("id", `options-${newId}`);

    initializeQuestion(fragment.firstElementChild);

    questionList.appendChild(fragment);
  }

  function removeQuestion(questionContainer) {
    questionList.removeChild(questionContainer);
    renumberQuestions();
  }

  function handleQuestionOptionsVisibility(type, options) {
    options.style.display =
      MULTIPLE_CHOICE_OPTIONS.includes(type.selectedOptions[0].value) ? "block" : "none";
  }

  function initializeQuestion(container) {
    const options = container.querySelector(".question-options-container");
    const type = container.querySelector(".question-type");
    type.addEventListener("change", () => handleQuestionOptionsVisibility(type, options));
    handleQuestionOptionsVisibility(type, options);

    const remove = container.querySelector(".remove-question");
    remove.addEventListener("click", () => removeQuestion(remove.closest(".question-container")));
  }

  function init() {
    [...questionList.querySelectorAll(".question-container")].forEach(el => initializeQuestion(el));
    addButton.addEventListener("click", () => addQuestion());
  }

  init();
})();
