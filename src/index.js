import './style.css';
import enter from './assets/enter.svg';
import refresh from './assets/rotation.svg';
import AddRemoveTask from './add-rmv.js';

const refreshBtn = document.querySelector('.refresh');
const enterBtn = document.querySelector('.enter');

refreshBtn.src = refresh;
enterBtn.src = enter;

const newlib = new AddRemoveTask();

newlib.submitNewTaskEntry();

window.onload = () => {
  const store = JSON.parse(localStorage.getItem('Todo-list1')) || [];
  store.forEach((task) => {
    task.onchange = (e) => {
      const clickedId = e.target.id;
      const clickedTask = store.find((e) => e.index === clickedId);
      clickedTask.text = e.target.value;
      localStorage.setItem('Todo-list1', JSON.stringify(store));
    };
    newlib.newTask(task);
  });
};
