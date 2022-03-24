import Task from "./Task.js";
import discard from "./assets/bin.svg";

const taskContainer = document.querySelector(".task-container");
const clearAllBtn = document.querySelector(".clear-btn");
const addNewTaskInput = document.getElementById("add-new-task");
const addForm = document.querySelector(".add-form");

class AddRemoveTask {
  constructor() {
    this.store = JSON.parse(localStorage.getItem("Todo-list1")) || [];
    this.filteredTask = [];
  }

  resetIndex() {
    let initialIndex = 1;
    this.store.forEach((task) => {
      task.index = initialIndex;
      initialIndex += 1;
    });
  }

  deleteTask(button) {
    button.addEventListener("click", () => {
      this.store = this.store.filter((tasks) => button.id !== tasks.id);
      taskContainer.innerHTML = "";
      this.store.forEach((task) => {
        this.newTask(task);
      });
      localStorage.setItem("Todo-list1", JSON.stringify(this.store));
    });
  }

  newTask({ completed, id, description, index }) {
    taskContainer.innerHTML += `
      <div class="task">
          <input type="checkbox" ${
            completed ? "checked" : ""
          } id='${index}' class="check">
          <input class="Task ${id}" type="text" value="${description}">
          <img id="${id}" class="delete" src="${discard}" alt="more">
      </div>
      `;

    const allCheckBoxes = document.querySelectorAll(".check");
    allCheckBoxes.forEach((checkBox) => {
      checkBox.addEventListener("click", (e) => {
        const clickedId = +e.target.id;
        console.log(typeof clickedId);
        this.store.forEach((task) => {
          task.index === clickedId;
          if (task.index === clickedId) {
            task.completed = !task.completed;
          }
        });
        localStorage.setItem("Todo-list1", JSON.stringify(this.store));
      });
    });
    const deleteBtn = document.querySelectorAll(".delete");
    deleteBtn.forEach((btn) => {
      this.deleteTask(btn);
      this.resetIndex();
    });

    clearAllBtn.addEventListener("click", () => {
      this.store.filter((task) => task.completed !== true);
      console.log(this.store);
      taskContainer.innerHTML = "";
      this.store.forEach((task) => {
        this.newTask(task);
      });
      localStorage.setItem("Todo-list1", JSON.stringify(this.store));
    });

    localStorage.setItem("Todo-list1", JSON.stringify(this.store));
  }

  removeAllCompleted() {
    clearAllBtn.addEventListener("click", () => {
      this.filteredTask = this.store.filter((task) => task.completed !== true);
      console.log(this.filteredTask);
      localStorage.setItem("Todo-list1", JSON.stringify(this.filteredTask));
      // taskContainer.innerHTML = "";
      this.newTask(this.filteredTask);
    });
  }

  localStorageToWebpage() {
    if (localStorage !== null) {
      const store = JSON.parse(localStorage.getItem("Todo-list1"));
      store.forEach((task) => {
        this.newTask(task);
      });
    }
  }

  submitNewTaskEntry() {
    addForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (addNewTaskInput.value === "") return;
      const index = this.store.length < 1 ? 1 : this.store.length + 1;
      const currTask = new Task(addNewTaskInput.value, index);
      this.store.push(currTask);
      this.newTask(currTask);
      addNewTaskInput.value = "";
    });

    localStorage.setItem("Todo-list1", JSON.stringify(this.store));
  }
}

export default AddRemoveTask;
