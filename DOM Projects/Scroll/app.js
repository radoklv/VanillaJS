// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
// select span
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", () => {
  // linksContainer.classList.toggle("show-links");

  const linksHeight = links.getBoundingClientRect().height;
  const containerHeight = linksContainer.getBoundingClientRect().height;
  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
  // console.log(linksContainer.getBoundingClientRect());
});

// ********** fixed navbar ************

const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;

  if (scrollHeight > navHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }
  // setup back to top link

  if (scrollHeight > 500) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

// ********** smooth scroll ************
//select links
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach(el =>{
  el.addEventListener('click', (e)=>{
    e.preventDefault();
    //navigate to spciific point
    const id = el.getAttribute('href').slice(1);
    const element = document.getElementById(id);

    //calc height
    const navHeigth = navbar.getBoundingClientRect().height;
    const cointainerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = nav.classList.contains('fixed-nav');
    let position = element.offsetTop - navHeigth;

    if(!fixedNav){
      position = position - navHeigth;
    }

    if(navHeigth > 82){
      position = position + cointainerHeight;
    }
  
    window.scrollTo({
      left: 0,
      top: position
    })

    linksContainer.style.height = 0;
  })
 

})

const arr = [0,1,2]



arr[6] = 5 
arr.forEach(e=>{
  console.log(e)
})