import { v4 as uuid } from 'uuid';
import Task from './Task.js';
import discard from './assets/bin.svg';

const taskContainer = document.querySelector('.task-container');
const clearAllBtn = document.querySelector('.clear-btn');
const addNewTaskInput = document.getElementById('add-new-task');
const addForm = document.querySelector('.add-form');
const refreshAll = document.querySelector('.refresh');
class AddRemoveTask {
  constructor() {
    this.store = JSON.parse(localStorage.getItem('Todo-list1')) || [];
    this.filteredTask = [];
  }

  refresh = () => {
    refreshAll.addEventListener('click', () => {
      taskContainer.innerHTML = '';
      this.store.forEach((task) => {
        this.newTask(task);
      });
    });
  };

  resetIndex() {
    this.store.forEach((task) => {
      task.index = uuid();
    });
  }

  deleteTask(button) {
    button.addEventListener('click', () => {
      this.store = this.store.filter((tasks) => button.id !== tasks.index);
      taskContainer.innerHTML = '';
      this.store.forEach((task) => {
        this.newTask(task);
      });
      localStorage.setItem('Todo-list1', JSON.stringify(this.store));
    });
  }

  newTask({
    completed, id, description, index,
  }) {
    taskContainer.innerHTML += `
      <div class="task" id=${index}>
          <input type="checkbox" ${
  completed ? 'checked' : ''
} id='${index}' class="check">
          <input class="Task ${id} ${
  completed ? 'checked' : ''
}" type="text" id=${index} value="${description}">
          <img id="${index}" class="delete" src="${discard}" alt="more">
      </div>
      `;

    const allCheckBoxes = document.querySelectorAll('.check');
    allCheckBoxes.forEach((checkBox) => {
      checkBox.addEventListener('click', (e) => {
        const clickedId = e.target.id;

        const clickedTask = this.store.find((e) => e.index === clickedId);

        clickedTask.completed = !clickedTask.completed;

        localStorage.setItem('Todo-list1', JSON.stringify(this.store));
        taskContainer.innerHTML = '';
        this.store.forEach((s) => this.newTask(s));
      });
    });

    const deleteBtn = document.querySelectorAll('.delete');
    deleteBtn.forEach((btn) => {
      this.deleteTask(btn);
    });

    clearAllBtn.addEventListener('click', () => {
      this.store = this.store.filter((task) => task.completed !== true);

      taskContainer.innerHTML = '';
      this.store.forEach((task) => {
        this.newTask(task);
      });
      localStorage.setItem('Todo-list1', JSON.stringify(this.store));
    });

    localStorage.setItem('Todo-list1', JSON.stringify(this.store));

    const tasks = document.querySelectorAll('.Task');
    tasks.forEach((task) => {
      task.addEventListener('keyup', (e) => {
        this.store.forEach((storedTask) => {
          const taskId = e.target.id;
          const taskValue = e.target.value;
          if (storedTask.index === taskId) {
            storedTask.description = taskValue;
          }
        });
        localStorage.setItem('Todo-list1', JSON.stringify(this.store));
      });
    });
  }

  removeAllCompleted() {
    clearAllBtn.addEventListener('click', () => {
      this.filteredTask = this.store.filter((task) => task.completed !== true);

      localStorage.setItem('Todo-list1', JSON.stringify(this.filteredTask));
      // taskContainer.innerHTML = "";
      this.newTask(this.filteredTask);
    });
  }

  localStorageToWebpage() {
    if (localStorage !== null) {
      const store = JSON.parse(localStorage.getItem('Todo-list1'));
      store.forEach((task) => {
        this.newTask(task);
      });
    }
  }

  submitNewTaskEntry() {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (addNewTaskInput.value === '') return;
      const index = uuid();
      const currTask = new Task(addNewTaskInput.value, index);
      this.store.push(currTask);
      this.newTask(currTask);
      addNewTaskInput.value = '';
    });

    localStorage.setItem('Todo-list1', JSON.stringify(this.store));
  }
}

export default AddRemoveTask;
