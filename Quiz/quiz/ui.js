class UI {
  constructor() {
    this._questionField = document.querySelector("#question");
    this._answerList = document.querySelector("#options-container ul");
  }

  //Update Questions List
  updateUi(data) {
    let list = "";
    this._questionField.innerHTML = data.question;

    data.options.forEach((question, index) => {
      const li = `<li class="question" data-id="${index}">${question}</li>`;
      list += li;
    });

    this._answerList.innerHTML = list;
  }


  //Check if the submitted answer is Correct and update UI
  isCorrect(selectedQuestion, correctAnswer) {
    if (correctAnswer == selectedQuestion) {
      Array.from(this._answerList.children).find((li) => {
        if (li.getAttribute("data-id") == selectedQuestion) {
          li.classList.add("correct");
        }

      });
      return true; //Return TRUE for right answer 
    } else {
      Array.from(this._answerList.children).forEach((li) => {
        if (li.getAttribute("data-id") == selectedQuestion) {
          li.classList.add("wrong");
        }

        if (li.getAttribute("data-id") == correctAnswer) {
          li.classList.add("correct");
        }
      });
      return false; //Return FALSE for wrong answer 
    }
  }
}
