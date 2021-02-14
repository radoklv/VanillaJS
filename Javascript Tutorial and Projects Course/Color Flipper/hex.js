const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const btn = document.querySelector("#btn");
const color = document.querySelector(".color");

const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

btn.addEventListener("click", () => {
    let hexColor = '#';

    for(let i = 0; i < 6; i++){
        hexColor += hex[randomNum(0,15)];
    }

    document.body.style.backgroundColor = hexColor
    color.textContent = hexColor
});
