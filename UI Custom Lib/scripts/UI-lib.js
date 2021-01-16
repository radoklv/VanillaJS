class Tabs{
    constructor(container){
        this.container = container;
        this.tabs = container.querySelectorAll('.trigger')
        this.contents = container.querySelectorAll('.content')
    }

    init(){
        this.tabs.forEach(tab =>{
           tab.addEventListener('click', (e)=>{
               this.toggleTabs(e);
               this.toggleContent(e);
           })
        })
    }

    toggleTabs(e){
        this.tabs.forEach(tab =>{
            tab.classList.remove('active');
            e.target.classList.add('active');
        })
    }

    toggleContent(e){
        this.contents.forEach(content =>{
            content.classList.remove('active');
        })
        
        const selector = e.target.getAttribute('data-target');
        this.container.querySelector(selector).classList.add('active')
    }
}

class Tooltip{
    constructor(element){
        this.element = element;
        this.message = element.getAttribute('data-message');
    }

    init(){
        const tip = document.createElement('div');
        tip.classList.add('tip');
        tip.textContent = this.message;
        this.element.appendChild(tip);

        this.element.addEventListener('mouseenter', ()=>{
            tip.classList.add('active');
        })

        this.element.addEventListener('mouseleave', ()=>{
            tip.classList.remove('active');
        })
    }
}

class Dropdown{
    constructor(container){
        this.item = container;
        this.trigger = container.querySelector('.trigger');
        this.content = container.querySelector('.content')
    }

    init(){
        this.trigger.addEventListener('click', ()=>{
            this.trigger.classList.toggle('active');
            this.content.classList.toggle('active');
        })
    }
}