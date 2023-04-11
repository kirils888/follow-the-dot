document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("food-type-form");
    const radioInputs = document.querySelectorAll("input[type='radio']");
    const submitButton = form.querySelector("button[type='submit']");
  
    if (form) {
      form.addEventListener("submit", handleFormSubmit);
  
      for (const radioInput of radioInputs) {
        radioInput.addEventListener("change", handleRadioInputChange);
      }
  
      submitButton.disabled = true;
    } else {
      console.error("Form not found");
    }
  
    function handleFormSubmit(event) {
      event.preventDefault();
  
      const formData = new FormData(event.target);
      let answerCounts = { A: 0, B: 0 };
  
      for (const value of formData.values()) {
        answerCounts[value]++;
      }
  
      const result = document.getElementById("result-food-type");
      const foodTypeImage = document.getElementById("food-type-image");
  
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

      // Scroll smoothly to the result-food-type element
      result.scrollIntoView({ behavior: 'smooth' });
    }
  
    function handleRadioInputChange() {
      submitButton.disabled = !areAllQuestionsAnswered();
    }
  
    function areAllQuestionsAnswered() {
      const questions = new Set();
  
      for (const radioInput of radioInputs) {
        if (radioInput.checked) {
          questions.add(radioInput.name);
        }
      }
  
      const totalQuestions = [...document.querySelectorAll(".questions")].length;
      return questions.size === totalQuestions;
    }
});
