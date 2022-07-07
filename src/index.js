import {
  createLocalStorage,
  addData,
  getData,
  deleteTask,
  updateIndexes,
} from './services';
import './style.css';

const list = document.querySelector('.todo_list');
const taskInput = document.querySelector('#task_input');
const addTaskButton = document.querySelector('#add_task');
const taskForm = document.querySelector('#task_form');

export let tasks = [
  { description: 'Buy new phone', completed: false, index: 1 },
  { description: 'go to cafe', completed: false, index: 2 },
  { description: 'write a new book', completed: false, index: 3 },
];

function createTaskElement(description, index, completed = false) {
  const li = document.createElement('li');
  li.classList.add('item');

  li.innerHTML = `<div id="task_item" class="group"><input type="checkbox" ${
    completed && 'checked'
  }/>
                     <p>${description}</p> </div> 
                     <i class="fa-solid fa-ellipsis-vertical" id="move_task"></i>
                      <i class="fa-solid fa-trash icon_hide" data-id="${index}" id="delete_task"></i>`;
  return li;
}

function displayAllTasks() {
  const tasks = getData('tasks');
  tasks.forEach(({ description, index, completed }) => {
    const li = createTaskElement(description, index, completed);
    list.appendChild(li);
  });
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (taskInput.value.trim() === '') return;

  const index = getData('tasks').length + 1;
  const task = { description: taskInput.value, index, completed: false };

  addData(task);

  const li = createTaskElement(task.description, false);
  list.appendChild(li);

  taskInput.value = '';
});

document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'task_item') {
    const deleteTaskBtn = e.target.parentElement.querySelector('#delete_task');
    const moveTaskBtn = e.target.parentElement.querySelector('#move_task');
    moveTaskBtn.classList.toggle('icon_hide');
    deleteTaskBtn.classList.toggle('icon_hide');
  } else if (e.target && e.target.id === 'delete_task') {
    const taskId = e.target.dataset.id;
    deleteTask(taskId);
    e.target.parentNode.remove(); // remove the task in the browser

    list.innerHTML = '';
    displayAllTasks();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  createLocalStorage('tasks', []);
  displayAllTasks();
});
