const todoList = document.querySelector(".todos");
const addForm = document.querySelector(".add");
const searchInput = document.querySelector("#search");

const todos = new Todos();
const ui = new UI(todoList);

todos.init((data) => {
  ui.updateUi(data);
});

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addForm.addInput.value.trim();
  todos.addTodo(todo);
  addForm.reset();
});

todoList.addEventListener("click", (e) => {
  if (e.target.className.includes("delete")) {
    const id = e.target.parentElement.getAttribute("data-id");
    todos.removeTodo(id);
  }
});

searchInput.addEventListener("keyup", (e) => {
    ui.filterTodos(searchInput.value.trim())
});
