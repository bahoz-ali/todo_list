import { createLocalStorage, addData, getData } from './services';
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

function createTaskElement(description, completed = false) {
  const li = document.createElement('li');
  li.classList.add('item');

  li.innerHTML = `<div class="group"><input type="checkbox" ${
    completed && 'checked'
  }/>
                     <p>${description}</p> </div> 
                     <i class="fa-solid fa-ellipsis-vertical"></i>`;
  return li;
}

function displayAllTasks(tasks) {
  tasks.forEach(({ completed, description }) => {
    const li = createTaskElement(description, completed);
    list.appendChild(li);
  });
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (taskInput.value.trim() === '') return;

  const index = getData('tasks').length + 1;
  const task = { description: taskInput.value, index, completed: false };

  addData(task);

  const li = createTaskElement(task.description);
  list.appendChild(li);

  taskInput.value = '';
});

document.addEventListener('DOMContentLoaded', () => {
  createLocalStorage('tasks', []);
  displayAllTasks(getData('tasks'));
});
