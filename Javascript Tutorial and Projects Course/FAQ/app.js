const questions = document.querySelectorAll(".question");

questions.forEach((question) => {
  const btn = question.querySelector(".question-btn");

  btn.addEventListener("click", (e) => {
    questions.forEach((qn) => {
      if (qn !== question) {
        qn.classList.remove("show-text");
      }
    });

    question.classList.toggle("show-text");
  });
});
