const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");

let counter = 0;


slides.forEach((slide, index) => {
  slide.style.left = `${index*100}%`;
});

prevBtn.addEventListener("click", () => {
  counter--;
  carousel()
});

nextBtn.addEventListener("click", () => {
  counter++;
  carousel()
});


function carousel(){
    if(counter >= slides.length){
        counter = 0;
    }else if(counter < 0){
        counter = slides.length - 1;
    }

    slides.forEach(slide =>{
        slide.style.transform = `translateX(-${counter*100}%)`
    })
}