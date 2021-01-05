const list = document.querySelector('.list')
const btn = document.querySelector('button')

let data = ['Apple', 'Banana', 'Pineapple'];

const iterator = () => {
	data.forEach(el =>{
  	list.innerHTML += `<li>${el}</li>`
  })
}

btn.addEventListener('click',() => {
	iterator();
})

list.addEventListener('click', e =>{
    console.log(e)
    if(e.target.nodeName == 'LI'){
        e.target.classList.toggle('highlighted')
    }
})
