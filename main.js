// Global variables
let hiddenFormSum = document.querySelector(".form-sum-result");
let submitBtn = document.querySelector(".submit-btn");
let nextBtn = document.querySelector(".next-section-btn");
let prevBtn = document.querySelector(".prev-section-btn");
let sumYesVal = document.querySelectorAll(".sum-yes-val");
let sumNoVal = document.querySelectorAll(".sum-no-val");
let inputRadioAll = document.querySelectorAll("input[type=radio]");
let fieldsetQuestions = document.querySelectorAll(".questions");
let sectionEat = document.querySelector(".section-eat");

let resultSum = 0;
let inputRadioArray = [];

submitBtn.setAttribute("disabled", "");
nextBtn.setAttribute("disabled", "");
// prevBtn.setAttribute("disabled", "");

// Loop trough all options to enable submit button
inputRadioAll.forEach(function(inputRadio) {
    inputRadio.addEventListener('change', function() {
      inputRadioArray = Array.from(inputRadioAll).filter(i => i.checked).map(i => i.value);
      if (inputRadioArray.length === 1) {
        // sectionEat.classList.add("is-active");
        nextBtn.removeAttribute("disabled", "");
      }
    })
}); 


// Count all data attributes values for Sum
submitBtn.addEventListener("click", formSum);

function formSum() {
  let inputRadioAllChecked = document.querySelectorAll("input[type=radio]:checked");
  for (a = 0; a < inputRadioAllChecked.length; a++) {
      // Yes & No values
      resultSum += inputRadioAllChecked[a].getAttribute("data-number") * 1;
  }
  hiddenFormSum.textContent = `Sum: ${resultSum}`;
}