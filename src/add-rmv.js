import Task from "./Task.js";
import discard from "./assets/bin.svg";
import { v4 as uuid } from "uuid";

const taskContainer = document.querySelector(".task-container");
const clearAllBtn = document.querySelector(".clear-btn");
const addNewTaskInput = document.getElementById("add-new-task");
const addForm = document.querySelector(".add-form");
const refreshAll = document.querySelector(".refresh");
class AddRemoveTask {
  constructor() {
    this.store = JSON.parse(localStorage.getItem("Todo-list1")) || [];
    this.filteredTask = [];
  }

  refresh = () => {
    refreshAll.addEventListener("click", () => {
      taskContainer.innerHTML = "";
      this.store.forEach((task) => {
        this.newTask(task);
      });
    });
  };

  resetIndex() {
    let initialIndex = 1;
    this.store.forEach((task) => {
      task.index = uuid();
    });
  }

  deleteTask(button) {
    button.addEventListener("click", () => {
      console.log(button);
      this.store = this.store.filter((tasks) => button.id !== tasks.index);
      taskContainer.innerHTML = "";
      this.store.forEach((task) => {
        this.newTask(task);
      });
      localStorage.setItem("Todo-list1", JSON.stringify(this.store));
    });
  }

  newTask({ completed, id, description, index }) {
    taskContainer.innerHTML += `
      <div class="task" id=${index}>
          <input type="checkbox" ${
            completed ? "checked" : ""
          } id='${index}' class="check">
          <input class="Task ${id}  ${
      completed ? "checked" : ""
    }" type="text" value="${description}">
          <img id="${index}" class="delete" src="${discard}" alt="more">
      </div>
      `;

    const allCheckBoxes = document.querySelectorAll(".check");
    allCheckBoxes.forEach((checkBox) => {
      checkBox.addEventListener("click", (e) => {
        const clickedId = e.target.id;
        console.log(clickedId);
        const clickedTask = this.store.find((e) => e.index === clickedId);
        console.log(this.store);
        clickedTask.completed = !clickedTask.completed;
        console.log(this.store);
        localStorage.setItem("Todo-list1", JSON.stringify(this.store));
        taskContainer.innerHTML = "";
        this.store.forEach((s) => this.newTask(s));
      });
    });
    const deleteBtn = document.querySelectorAll(".delete");
    deleteBtn.forEach((btn) => {
      this.deleteTask(btn);
    });

    clearAllBtn.addEventListener("click", () => {
      this.store = this.store.filter((task) => task.completed !== true);

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
      // const index = this.store.length < 1 ? 1 : this.store.length + 1;
      const index = uuid();
      const currTask = new Task(addNewTaskInput.value, index);
      this.store.push(currTask);
      this.newTask(currTask);
      addNewTaskInput.value = "";
    });

    localStorage.setItem("Todo-list1", JSON.stringify(this.store));
  }
}

export default AddRemoveTask;
