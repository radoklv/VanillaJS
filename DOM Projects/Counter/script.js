// const decr = document.querySelector('#dec');
// const reset = document.querySelector('#reset');
// const incr = document.querySelector('#incr');
// const number = document.querySelector('.number')

// let counter = 0;

// const displayNumber = (counter) =>{
//     if(counter < 0){
//         number.style.color = 'red'
//     }else{
//         number.style.color = 'green'
//     }

//     number.textContent = counter;
// }

// displayNumber(0);


// decr.addEventListener('click', () =>{
//     counter--;
//     displayNumber(counter)
    
// })

// reset.addEventListener('click', () =>{
//     counter = 0;
//     displayNumber(counter)
// })

// incr.addEventListener('click', () =>{
//     counter++;
//     displayNumber(counter)
// })

const value = document.querySelector('#counter');
const btns = document.querySelectorAll('.btn');

let counter = 0;

btns.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
        if(e.target.classList.contains('incr')){
            counter++;
        }else if(e.target.classList.contains('decr')){
            counter--;
        }else if(e.target.classList.contains('reset')){
            counter = 0
        }

        if(counter < 0 ){
            value.style.color = 'red'
        }else if(counter > 0){
            value.style.color = 'green'
        }else{
            value.style.color = 'black'
        }

        value.textContent = counter
    })
})

