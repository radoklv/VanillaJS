// ****** SELECT ITEMS **********
const form = document.querySelector(".grocery-form");
const submitBtn = document.querySelector(".submit-btn");
const itemsList = document.querySelector(".grocery-list");
const listContainer = document.querySelector(".grocery-container");
const clearBtn = document.querySelector(".clear-btn");
const alert = document.querySelector(".alert");

// edit option
let editElement = undefined;
let editFlag = false;
let editId = null;

// ****** EVENT LISTENERS **********
window.addEventListener("DOMContentLoaded", initApp);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = form.grocery.value.trim();

  if (value && !editFlag) {
    let id = new Date().getTime().toString();

    addElement(id, value);
    addToLocalStorage(id, value);

    if (!listContainer.classList.contains("show-container")) {
      listContainer.classList.add("show-container");
    }
  } else if (value && editFlag) {
    const updatedVal = form.grocery.value.trim();
    updateElement(editElement, updatedVal);
  } else {
    alertMessage("There is empty Value!", false);
  }

  reset();
});

itemsList.addEventListener("click", (e) => {
  const parent = e.target.parentElement.parentElement.parentElement;

  if (e.target.classList.contains("fa-edit")) {
    submitBtn.textContent = "update";
    editFlag = true;
    const title = parent.querySelector(".title");
    editId = parent.getAttribute("data-id");
    form.grocery.value = title.textContent;
    editElement = parent;
  }

  if (e.target.classList.contains("fa-trash")) {
    deleteFromLocalStorage(parent.getAttribute("data-id"));
    parent.remove();

    if (itemsList.children.length == 0) {
      listContainer.classList.remove("show-container");
    }

    reset();
  }
});

clearBtn.addEventListener("click", deleteList);



// ****** FUNCTIONS **********

function initApp() {
  let todos = getLocalStorage();
  if (todos) {
    todos.forEach((todo) => {
      addElement(todo.id, todo.title);
    });
  }

  if (itemsList.children.length) {
    listContainer.classList.add("show-container");
  }
}

function updateElement(parent, newVal) {
  parent.querySelector(".title").textContent = newVal;
  const todos = getLocalStorage();
  const updatedTodos = todos.map((todo) => {
    if (todo.id == editId) {
      return { id: todo.id, title: newVal };
    } else {
      return todo;
    }
  });
  setLocalStorage(updatedTodos);
  alertMessage("Todo was updated successful!");
  reset();
}

function addElement(id, value) {
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

  alertMessage("Todo was added successful!");
  itemsList.innerHTML += html;
}

function deleteList() {
  itemsList.innerHTML = "";
  localStorage.removeItem("todos");
  if (itemsList.children.length == 0) {
    listContainer.classList.remove("show-container");
  }
  alertMessage("Todo List was cleared successful!");
  reset();
}

function addToLocalStorage(id, value) {
  if (!localStorage.getItem("todos")) {
    const newObj = [{ id: id, title: value }];
    setLocalStorage(newObj);
  } else {
    let todos = getLocalStorage();
    todos.push({
      id: id,
      title: value,
    });
    setLocalStorage(todos);
  }
}

function deleteFromLocalStorage(id) {
  let todos = getLocalStorage();
  todos = todos.filter((todo) => {
    return todo.id != id;
  });
  localStorage.setItem("todos", JSON.stringify(todos));

  alertMessage("Todo was deleted successful!");
}

function alertMessage(message, bgColor = true) {
  if (bgColor) {
    alert.classList.add("alert-success");
  } else {
    alert.classList.add("alert-danger");
  }

  alert.textContent = `${message}`;
  setTimeout(() => {
    alert.classList.remove("alert-success");
    alert.classList.remove("alert-danger");
    alert.textContent = "";
  }, 1000);
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("todos"));
}

function setLocalStorage(obj) {
  localStorage.setItem("todos", JSON.stringify(obj));
}

function reset() {
  editElement = undefined;
  editFlag = false;
  editId = null;
  form.reset();
  submitBtn.textContent = "save";
}
