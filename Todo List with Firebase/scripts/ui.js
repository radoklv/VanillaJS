class UI {
  constructor(todos) {
    this.todos = todos;
    this.html;
  }

  updateUi(data) {
    this.html = "";
    data.forEach((change) => {
      const doc = change.doc;
      if (change.type == "added") {
        this.addTodo(doc.data(), doc.id);
      } else if (change.type == "removed") {
        this.removeTodo(doc.id);
      }
    });
  }

  addTodo(todo, id) {
    this.html = `<li class="todo" data-id="${id}">
                       <p>${todo.title}</p>
                      <i class="far fa-trash-alt delete"></i>
                  </li>`;

    this.todos.innerHTML += this.html;
  }

  removeTodo(id) {
    const list = todos.querySelectorAll(".todo");

    list.forEach((todo) => {
      const todoId = todo.getAttribute("data-id");
      if (todoId == id) {
        todo.remove();
      }
    });  
  }

  filterTodos(word){
    const list = this.todos.querySelectorAll('.todo')
    list.forEach(todo =>{
        const lowered = todo.textContent.toLowerCase()
        if(!lowered.includes(word.toLowerCase())){
            todo.classList.add('filtered')
        }else{
            todo.classList.remove('filtered')
        }
    })
  }



}
