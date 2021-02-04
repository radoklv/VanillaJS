//Query DOM
const playBtn = document.querySelector("#get-started-button");
const quizWrapper = document.querySelector("#quiz");
const loader = document.querySelector("#loader-view");
const questionList = document.querySelector("#options-container ul");
const submitBtn = document.querySelector("#submit-button");

//Init APP
const questions = new Questions();
const ui = new UI();

let selectedQuestion = null;

const initApp = async () => {
  selectedQuestion = null;
  questions.getQuestion((data) => {
    ui.updateUi(data);
  });
};

initApp();

//Event Listeners
playBtn.addEventListener("click", () => {
  loader.classList.remove("hide");
  setTimeout(() => {
    loader.classList.add("hide");
    quizWrapper.classList.remove("hide");
    playBtn.classList.add("hide");
  }, 500);
});

questionList.addEventListener("click", (e) => {
  if (e.target.nodeName == "LI") {
    selectedQuestion = e.target.getAttribute("data-id");

    Array.from(questionList.children).forEach((li) => {
      li.classList.remove("selected");
    });
    e.target.classList.add("selected");
  }
});

submitBtn.addEventListener("click", () => {
  if (selectedQuestion) {
    const isCorrect = ui.isCorrect(selectedQuestion, questions.answer);
    
    if(isCorrect){ //Increment final result of Correct Answers
      questions.correctAnswers = 1;
    }

    setTimeout(() => {
      questions.id = 1;
      initApp();
    }, 3000);
  }else{
    alert("Choose one answer before Submitting!")
  }
});
