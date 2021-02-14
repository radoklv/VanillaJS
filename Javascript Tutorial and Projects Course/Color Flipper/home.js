const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];
const btn = document.querySelector("#btn");
const color = document.querySelector(".color");

const randomNum= (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

btn.addEventListener("click", () => {
    const rndNum = randomNum(0, 3)
    
    document.body.style.backgroundColor = colors[rndNum];
    color.textContent = colors[rndNum]
});

