// Global variables
let hiddenFormSum = document.querySelector(".form-sum-result");
let submitBtn = document.querySelector(".submit-btn");
let nextBtn = document.querySelector(".next-section-btn");
let sumYesVal = document.querySelectorAll(".sum-yes-val");
let sumNoVal = document.querySelectorAll(".sum-no-val");
let inputRadioAll = document.querySelectorAll("input[type=radio]");
let fieldsetQuestions = document.querySelectorAll(".questions");
let formSection = document.querySelectorAll(".form-section");
let pageForm = document.querySelector(".page-form");

let resultSum = 0;
let inputRadioArray = [];

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

console.log(formSection.length - 1);

nextBtn.addEventListener("click", function() {
  for (let i = 0; i < formSection.length; i++) {
    
    if (formSection[i].classList.contains("is-active")) {
      formSection[i].classList.remove("is-active")
      formSection[i].classList.add("is-hidden")
      
      formSection[i+1].classList.remove("is-hidden")
      formSection[i+1].classList.add("is-active")
      // const elementsArray = Array.from(elements);

      break;
    } 
      // nextBtn.classList.add("is-hidden");
      // submitBtn.classList.remove("is-hidden");
  }
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