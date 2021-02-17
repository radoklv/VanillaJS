const aboutSection = document.querySelector(".about");
const tabButtons = document.querySelectorAll(".tab-btn");
const contentTabs = document.querySelectorAll(".content");

aboutSection.addEventListener("click", (e) => {
  if (e.target.nodeName == "BUTTON") {
    const id = e.target.getAttribute("data-id");
    
    tabButtons.forEach((button) => {
      if (button.classList.contains("active")) {
        button.classList.remove("active");
      }
    });

    e.target.classList.add("active");

    contentTabs.forEach((content) => {
      content.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
  }
});
