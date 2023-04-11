document.addEventListener("DOMContentLoaded", init);

function init() {
  const form = getForm();

  if (!form) {
    console.error("Form not found");
    return;
  }

  const radioInputs = getRadioInputs();
  const submitButton = getSubmitButton(form);

  form.addEventListener("submit", handleFormSubmit);
  radioInputs.forEach((radioInput) =>
    radioInput.addEventListener("change", () => handleRadioInputChange(submitButton, radioInputs))
  );

  submitButton.disabled = true;
}

function getForm() {
  return document.getElementById("food-type-form");
}

function getRadioInputs() {
  return [...document.querySelectorAll("input[type='radio']")];
}

function getSubmitButton(form) {
  return form.querySelector("button[type='submit']");
}

function handleFormSubmit(event) {
  event.preventDefault();

  const answerCounts = getAnswerCounts(new FormData(event.target));
  displayFoodType(answerCounts);

  scrollToResult();
}

function getAnswerCounts(formData) {
  const answerCounts = { A: 0, B: 0 };

  for (const value of formData.values()) {
    answerCounts[value]++;
  }

  return answerCounts;
}

function displayFoodType(answerCounts) {
  const foodTypeImage = document.getElementById("food-type-image");
  const result = document.getElementById("result-food-type");

  if (answerCounts.A >= answerCounts.B + 3) {
    foodTypeImage.src = "Assets/protein-type-rus.png";
    foodTypeImage.alt = "Protein type";
  } else if (answerCounts.B >= answerCounts.A + 3) {
    foodTypeImage.src = "Assets/carbon-type-rus.png";
    foodTypeImage.alt = "Carbohydrate type";
  } else {
    foodTypeImage.src = "Assets/mixed-type-rus.png";
    foodTypeImage.alt = "Mixed type";
  }

  result.style.display = "block";
}

function scrollToResult() {
  const result = document.getElementById("result-food-type");
  result.scrollIntoView({ behavior: "smooth" });
}

function handleRadioInputChange(submitButton, radioInputs) {
  submitButton.disabled = !areAllQuestionsAnswered(radioInputs);
}

function areAllQuestionsAnswered(radioInputs) {
  const questions = new Set();

  for (const radioInput of radioInputs) {
    if (radioInput.checked) {
      questions.add(radioInput.name);
    }
  }

  const totalQuestions = [...document.querySelectorAll(".questions")].length;
  return questions.size === totalQuestions;
}
