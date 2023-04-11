const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const elements = {
  tableScores: $$(".table-score"),
  inputScores: $$(".input-scores"),
  customerName: $("#customer-name"),
  customerFullName: $("#customer-full-name"),
  customerWelcomeTxt: $(".customer-welcome-txt"),
  submitBtn: $(".submit-btn"),
  nextBtn: $(".next-section-btn"),
  inputTotalScores: $(".input-total-scores"),
  tableTotalScores: $(".table-total-score"),
  formSection: $$(".form-section"),
  tableWrapper: $$(".table-wrapper"),
  questionnaireContainer: $(".questionnaire-container"),
  switchLang: $(".lang-switch"),
  langRu: $$('[lang="ru"]'),
  langEn: $$('[lang="en"]'),
  form: $("#question-form"),
};

let resultSum = 0;
let totalScore = 0;

elements.switchLang.addEventListener("click", () => {
  [...elements.langRu, ...elements.langEn].forEach((element) => {
    element.classList.toggle("is-hidden");
  });
});

const radioChecks = () => {
  const inputRadioAllChecked = $$("input[type='radio']:checked");

  inputRadioAllChecked.forEach((element) => {
    const dataNumber = Number(element.getAttribute("data-number"));
    resultSum += dataNumber;
    totalScore += dataNumber;
    element.removeAttribute("data-number");
  });
};

elements.nextBtn.addEventListener("click", () => {
  radioChecks();

  for (let i = 0; i < elements.formSection.length - 1; i++) {
    const section = elements.formSection[i];
    
    if (!section.classList.contains("is-active")) continue;

    elements.tableScores[i].textContent = ` ${resultSum}`;
    elements.inputScores[i].value = `${resultSum} score`;

    section.classList.remove("is-active");
    section.classList.add("is-hidden");

    resultSum = 0;

    const nextSection = elements.formSection[i + 1];
    nextSection.classList.remove("is-hidden");
    nextSection.classList.add("is-active");

    if (nextSection.classList.contains("last-section")) {
      elements.nextBtn.classList.add("is-hidden");
      elements.submitBtn.classList.remove("is-hidden");
    }
    break;
  }
});

elements.submitBtn.addEventListener("click", () => {
  radioChecks();

  const lastSectionIndex = elements.formSection.length - 1;

  elements.inputScores[lastSectionIndex].value = `${resultSum} score`;
  elements.inputTotalScores.value = `${totalScore} score`;

  elements.tableScores[lastSectionIndex].textContent = ` ${resultSum}`;
  elements.tableTotalScores.textContent = `${totalScore}`;

  elements.questionnaireContainer.classList.add("is-hidden");
  elements.customerWelcomeTxt.classList.remove("is-hidden");

  elements.tableWrapper.forEach((tableWrapper) => {
    tableWrapper.classList.remove("is-hidden");
    elements.customerName.textContent = `${elements.customerFullName.value},`;
  });
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