import "./style.css";
import more from "./assets/more.svg";
import enter from "./assets/enter.svg";
import refresh from "./assets/rotation.svg";

const tasks = [
  {
    description: "Task num 1",
    completed: false,
    index: 0,
  },
  {
    description: "Task num 2",
    completed: false,
    index: 1,
  },
  {
    description: "Task num 3",
    completed: false,
    index: 2,
  },
  {
    description: "Task num 4",
    completed: false,
    index: 3,
  },
];

const taskContainer = document.querySelector(".task-container");
const refreshBtn = document.querySelector(".refresh");
const enterBtn = document.querySelector(".enter");

refreshBtn.src = refresh;
enterBtn.src = enter;

const fillTasks = () => {
  for (let i = 0; i < tasks.length; i += 1) {
    taskContainer.innerHTML += `
      <div class="task">
          <input id="front-end" type="checkbox" value="front-end">
          <input type="text" value="${tasks[i].description}" class="new-task">
          <img class="more" src="${more}" alt="more">
      </div>
      `;
  }
};
fillTasks();
