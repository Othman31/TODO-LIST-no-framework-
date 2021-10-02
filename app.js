//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listener
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos); //when the page document load fully implement the function

//functions

//create and add todos li
function addTodo(e) {
  //todo Div
  const todoDiv = document.createElement("todo");
  todoDiv.classList.add("todo");
  //todo li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.style.backgroundColor = randomColor();
  todoDiv.appendChild(newTodo);
  //add todo to the local host
  saveLocalTodos(todoInput.value);
  //check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="far fa-calendar-check"></i>`;
  completedButton.classList.add("completed-btn");
  todoDiv.appendChild(completedButton);
  //trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash-restore-alt"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);

  //clear todoInput value
  todoInput.value = "";
  e.preventDefault();
}

//delete and checked btn
function deleteCheck(e) {
  const item = e.target;
  //delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //check mark
  if (item.classList[0] === "completed-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//filtering dropdown menu
function filterTodo(e) {
  const todos = todoList.children;
  //convert the html collection to array to use forEach
  const todosList = Array.from(todos);
  //listener is in the ul
  todosList.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else todo.style.display = "none";
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else todo.style.display = "none";
        break;
    }
  });
}

//function to save to local storage
function saveLocalTodos(todo) {
  //check if if there is something in storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//show todos that are stored in localStorage
function getTodos() {
  //check if if there is something in storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    //todo Div
    const todoDiv = document.createElement("todo");
    todoDiv.classList.add("todo");
    //todo li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");

    todoDiv.style.backgroundColor = randomColor();

    todoDiv.appendChild(newTodo);
    //check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="far fa-calendar-check"></i>`;
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);
    //trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash-restore-alt"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}

//deleting created todos from localStorage
function removeLocalTodos(todo) {
  //check if if there is something in storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //get the value of the li
  const todoIndex = todo.children[0].innerText;
  //delete just 1 element from the indexOf the value
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//random background color
function randomColor() {
  let hexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  let colorParts = [];

  for (let i = 0; i < 6; i++) {
    colorParts.push(hexArray[Math.floor(Math.random() * hexArray.length)]);
  }
  let randomColor = `#${colorParts.join("")}`;
  return randomColor;
}
//css insertion
