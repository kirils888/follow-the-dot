// Global variables
const TABLE_SCORES = document.querySelectorAll(".table-score");
const TABLE_CUSTOMER_NAME = document.getElementById("customer-name");
const CUSTOMER_NAME = document.getElementById("customer-full-name")

let submitBtn = document.querySelector(".submit-btn")
let nextBtn = document.querySelector(".next-section-btn")

let sumYesVal = document.querySelectorAll(".sum-yes-val")
let sumNoVal = document.querySelectorAll(".sum-no-val")

let inputRadioAll = document.querySelectorAll(".form-section-eat input[type=radio]")
let fieldsetQuestions = document.querySelectorAll(".questions")
let formSection = document.querySelectorAll(".form-section")
let pageForm = document.querySelector(".page-form")
let tableWrapper = document.querySelectorAll(".table-wrapper")
let questionnaireContainer = document.querySelector(".questionnaire-container")
let switchLang = document.querySelector(".lang-switch")
let langRu = document.querySelectorAll('[lang="ru"]')
let langEn = document.querySelectorAll('[lang="en"]')

let resultSum = 0;
let inputRadioArray = [];

// nextBtn.setAttribute("disabled", "");
// submitBtn.setAttribute("disabled", "");

// Loop trough all options to enable submit button
// inputRadioAll.forEach(function(inputRadio) {
//     inputRadio.addEventListener('change', function() {
//       inputRadioArray = Array.from(inputRadioAll).filter(i => i.checked).map(i => i.value);
//       if (inputRadioArray.length === 3) {
//         // sectionEat.classList.add("is-active");
//         nextBtn.removeAttribute("disabled", "");
//       }
//     })
// }); 

// Switch Language
switchLang.addEventListener("click", function() {
  for (let i = 0; i < langRu.length; i++) {
    langRu[i].classList.toggle("is-hidden")
    langEn[i].classList.toggle("is-hidden")
  }
})

function radioChecks() {
  let inputRadioAllChecked = document.querySelectorAll("input[type='radio']:checked");
  for (a = 0; a < inputRadioAllChecked.length; a++) {

      // Add data-number values to resultSum
      resultSum += inputRadioAllChecked[a].getAttribute("data-number") * 1;

      // Remove data numbers from previous sections, so it doesn't count
      inputRadioAllChecked[a].removeAttribute("data-number");
  }
}

nextBtn.addEventListener("click", function() {
  radioChecks();

  // Show & hide form sections
  for (let i = 0; i < formSection.length - 1; i++) {
    
    if (formSection[i].classList.contains("is-active")) {
      TABLE_SCORES[i].textContent = ` ${resultSum} score`
      // TABLE_SCORES[i].classList.remove("is-active")
      
      formSection[i].classList.remove("is-active")
      formSection[i].classList.add("is-hidden")
      
      // reset Sum for next active section
      resultSum = 0;

      // Make next section active
      formSection[i+1].classList.remove("is-hidden")
      formSection[i+1].classList.add("is-active")
      if (formSection[i+1].classList.contains("last-section")) {
        nextBtn.classList.add("is-hidden")
        submitBtn.classList.remove("is-hidden")
      }
      break;
    }
  }

});

submitBtn.addEventListener("click", function() {
  radioChecks();

  TABLE_SCORES[formSection.length - 1].textContent = ` ${resultSum} score`

  questionnaireContainer.classList.add("is-hidden")
  for (let c = 0; c < tableWrapper.length; c++) {
    tableWrapper[c].classList.remove("is-hidden")
    TABLE_CUSTOMER_NAME.textContent = `Hey ${CUSTOMER_NAME.value}, here are your results`
  }

});