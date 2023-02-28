// Global variables
const TABLE_SCORES = document.querySelectorAll(".table-score")
const INPUT_SCORES = document.querySelectorAll(".input-scores")
const TABLE_CUSTOMER_NAME = document.getElementById("customer-name")
const CUSTOMER_NAME = document.getElementById("customer-full-name")
const CUSTOMER_WELCOME_TXT = document.querySelector(".customer-welcome-txt")

let submitBtn = document.querySelector(".submit-btn")
let nextBtn = document.querySelector(".next-section-btn")

let sumYesVal = document.querySelectorAll(".sum-yes-val")
let sumNoVal = document.querySelectorAll(".sum-no-val")

let inputTotalScores = document.querySelector(".input-total-scores")
let tableTotalScores = document.querySelector(".table-total-score")
let inputRadioAll = document.querySelectorAll("input[type=radio]")
let fieldsetQuestions = document.querySelectorAll(".questions")
let formSection = document.querySelectorAll(".form-section")
let pageForm = document.querySelector(".page-form")
let tableWrapper = document.querySelectorAll(".table-wrapper")
let questionnaireContainer = document.querySelector(".questionnaire-container")
let switchLang = document.querySelector(".lang-switch")
let langRu = document.querySelectorAll('[lang="ru"]')
let langEn = document.querySelectorAll('[lang="en"]')

let resultSum = 0
let totalScore = 0
let inputRadioArray = []

// nextBtn.setAttribute("disabled", "");
// submitBtn.setAttribute("disabled", "");

// Loop trough all options to enable submit button
// inputRadioAll.forEach(function(inputRadio) {
//     inputRadio.addEventListener('change', function() {
//       inputRadioArray = Array.from(inputRadioAll).filter(i => i.checked).map(i => i.value);
//       if (inputRadioArray.length === 3) {
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
      totalScore += inputRadioAllChecked[a].getAttribute("data-number") * 1;
      // console.log(totalScore)

      // Remove data numbers from previous sections, so it doesn't count
      inputRadioAllChecked[a].removeAttribute("data-number")
  }
}

nextBtn.addEventListener("click", function() {
  radioChecks();

  // Show & hide form sections
  for (let i = 0; i < formSection.length - 1; i++) {
    
    if (formSection[i].classList.contains("is-active")) {
      TABLE_SCORES[i].textContent = ` ${resultSum}`
      INPUT_SCORES[i].value = `${resultSum} score`
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

  // For email
  INPUT_SCORES[formSection.length - 1].value = `${resultSum} score`
  inputTotalScores.value = `${totalScore} score`

  // For user
  TABLE_SCORES[formSection.length - 1].textContent = ` ${resultSum}`
  tableTotalScores.textContent = `${totalScore}`

  questionnaireContainer.classList.add("is-hidden")
  CUSTOMER_WELCOME_TXT.classList.remove("is-hidden")
  for (let c = 0; c < tableWrapper.length; c++) {
    tableWrapper[c].classList.remove("is-hidden")
    TABLE_CUSTOMER_NAME.textContent = `${CUSTOMER_NAME.value},`
  }

});

//== Form Async

let form = document.getElementById("question-form");
async function handleSubmit(event) {
  event.preventDefault();
//let status = document.getElementById("my-form-status");
  let data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      console.log("form sent")
      form.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
        //status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        alert(data["errors"].map(error => error["message"]).join(", "))
        } else {
          alert("Oops! There was a problem submitting your form")
        }
      })
    }
  }).catch(error => {
    alert("Oops! There was a problem submitting your form")
  });
}
form.addEventListener("submit", handleSubmit)

    // $("#question-form").submit(function(e){
    //   e.preventDefault();
    //   var action = $(this).attr("action");
    //   $.ajax({
    //     type: "POST",
    //     url: action,
    //     crossDomain: true,
    //     data: new FormData(this),
    //     dataType: "json",
    //     processData: false,
    //     contentType: false,
    //     headers: {
    //       "Accept": "application/json"
    //     }
    //   }).done(function() {
    //      console.log("form sent")
    //   }).fail(function() {
    //      alert('An error occurred! Please try again later.')
    //   });
    // });