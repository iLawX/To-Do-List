let taskName = document.querySelector(".input");
let addTask = document.querySelector(".add");
let tasks = document.querySelector(".tasks");

let arrayOfTaskes = [];

if (window.localStorage.getItem("tasks")) {
  arrayOfTaskes = JSON.parse(window.localStorage.getItem("tasks"));
  createElements();
}

addTask.addEventListener("click", () => {
  if (taskName.value !== "") {
    const task = {
      id: Date.now(),
      title: taskName.value,
    };
    arrayOfTaskes.push(task);
    saveTasksToLocalStorage();
    taskName.value = "";
    createElements();
  }
});

function saveTasksToLocalStorage() {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTaskes));
}

function createElements() {
  tasks.innerHTML = "";
  for (let i = 0; i < arrayOfTaskes.length; i++) {
    let task = document.createElement("div");
    task.setAttribute("data-id", arrayOfTaskes[i].id);
    task.className = "animation";
    let taskText = document.createTextNode(arrayOfTaskes[i].title);
    task.appendChild(taskText);
    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "Delete";
    deleteBtn.className = "del";
    task.appendChild(deleteBtn);
    tasks.appendChild(task);
  }
}
function deleteElementWith(taskId) {
  arrayOfTaskes = arrayOfTaskes.filter((task) => task.id != +taskId);
  saveTasksToLocalStorage();
}
tasks.addEventListener("click", (e) => {
  if (e.target.className == "del") {
    if (e.target.parentElement.previousElementSibling !== null) {
      e.target.parentElement.previousElementSibling.classList.remove(
        "animation"
      );
    }
    deleteElementWith(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.remove();
  }
});
document.body.previousElementSibling;
