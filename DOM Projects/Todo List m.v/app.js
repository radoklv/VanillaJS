// ****** SELECT ITEMS **********
const form = document.querySelector(".grocery-form");
const submitBtn = document.querySelector(".submit-btn");
const itemsList = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
const alert = document.querySelector(".alert");

// edit option
let parentToUpdate = undefined;
let editFlag = false;

// ****** EVENT LISTENERS **********

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = form.grocery.value.trim();

  if (value && !editFlag) {
    let id = new Date().getTime().toString();
    addElement(id, value, false);
  } else if (value && editFlag) {
    const updatedVal = form.grocery.value.trim();
    updateElement(parentToUpdate, updatedVal);
    submitBtn.textContent = "save";
  }else{
    alertMessage('There is empty Value!', false);
  }
  editFlag = false;
  form.reset();
});

itemsList.addEventListener("click", (e) => {
  const parent = e.target.parentElement.parentElement.parentElement;

  if (e.target.classList.contains("fa-edit")) {
    submitBtn.textContent = "update";
    editFlag = true;
    const title = parent.querySelector(".title");
    form.grocery.value = title.textContent;
    parentToUpdate = parent;
  }

  if (e.target.classList.contains("fa-trash")) {
    deleteFromLocalStorage(parent.getAttribute("data-id"));
    parent.remove();
  }
});

clearBtn.addEventListener("click", () => {
  itemsList.innerHTML = "";
  localStorage.setItem("todos", []);
  alertMessage("Todo List was cleared successful!");
});

// ****** FUNCTIONS **********
initApp();

function initApp() {
  let todos = readFromLS();
  if (todos) {
    todos.forEach((todo) => {
      addElement(todo.id, todo.title, true);
    });
  }
}

function updateElement(parent, newVal) {
  const id = parent.getAttribute("data-id");
  parent.querySelector(".title").textContent = newVal;

  const todos = readFromLS();
  const updatedTodos = todos.map((todo) => {
    if (todo.id == id) {
      return { id: todo.id, title: newVal };
    } else {
      return todo;
    }
  });

  writeInLS(updatedTodos);

  alertMessage("Todo was updated successful!");
}

function addElement(id, value, isInit) {
  if (!value) {
    return;
  }

  const html = `
  <article class="grocery-item" data-id='${id}'>
    <p class="title">${value}</p>

    <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>

      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </article>`;

  if (!isInit) {
    if (!localStorage.getItem("todos")) {
      const newObj = [{ id: id, title: value }];
      writeInLS(newObj);
    } else {
      let todos = readFromLS();
      todos.push({
        id: id,
        title: value,
      });
      writeInLS(todos);
    }

    alertMessage("Todo was added successful!");
  }

  itemsList.innerHTML += html;
}

function deleteFromLocalStorage(id) {
  let todos = readFromLS();
  todos = todos.filter((todo) => {
    return todo.id != id;
  });
  localStorage.setItem("todos", JSON.stringify(todos));

  alertMessage("Todo was deleted successful!");
}

function alertMessage(message, bgColor = true) {
  if(bgColor){
    alert.classList.add("alert-success");
  }else{
    alert.classList.add("alert-danger");
  }

  alert.textContent = `${message}`;
  setTimeout(() => {
    alert.classList.remove("alert-success");
    alert.classList.remove("alert-danger");
    alert.textContent = "";
  }, 1000);
}

function readFromLS() {
  return JSON.parse(localStorage.getItem("todos"));
}

function writeInLS(obj) {
  localStorage.setItem("todos", JSON.stringify(obj));
}
