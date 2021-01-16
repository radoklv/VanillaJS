const todos = document.querySelector(".todos");
const addForm = document.querySelector(".add");
const searchInput = document.querySelector("#search");


const forecast = new Forecast();
const ui = new UI(todos);

forecast.init((data) => {
  ui.updateUi(data);
});

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addForm.addInput.value.trim();
  forecast.addTodo(todo);
  addForm.reset();
});

todos.addEventListener("click", (e) => {
  if (e.target.className.includes("delete")) {
    const id = e.target.parentElement.getAttribute("data-id");
    forecast.removeTodo(id);
  }
});

searchInput.addEventListener("keyup", (e) => {
    ui.filterTodos(searchInput.value.trim())
});
