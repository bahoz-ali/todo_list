/* eslint-disable import/extensions */

import {
  createLocalStorage,
  addData,
  getData,
  deleteTask,
  updateOneTask,
} from './services';
import './style.css';
import { clearCompleteTasks, updateCompleteTask } from './update_complete';

const list = document.querySelector('.todo_list');
const taskInput = document.querySelector('#task_input');
const taskForm = document.querySelector('#task_form');
const clearCompletedBtn = document.querySelector('.btn--clear');

function createTaskElement(description, index, completed = false) {
  const li = document.createElement('li');
  li.classList.add('item');

  li.innerHTML = `<div id="task_item" class="group"> 
                    <input id="check_task" type="checkbox" ${
  completed ? 'checked' : ''
} data-index="${index}"/>  
                    <input class="reset-input ${
  completed ? 'completed' : ''
}" data-index="${index}" type="text" disabled value="${description}" />
                  </div> 
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

  const li = createTaskElement(task.description, index, false);
  list.appendChild(li);

  taskInput.value = '';
});

document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'task_item') {
    const deleteTaskBtn = e.target.parentElement.querySelector('#delete_task');
    const moveTaskBtn = e.target.parentElement.querySelector('#move_task');
    const inputTask = e.target.parentElement.querySelector('.reset-input');
    moveTaskBtn.classList.toggle('icon_hide');
    deleteTaskBtn.classList.toggle('icon_hide');

    // TODO: this is for update the text of input
    inputTask.removeAttribute('disabled');
    inputTask.focus();

    inputTask.addEventListener('keyup', (e) => {
      const { index } = inputTask.dataset;

      if (e.key === 'Enter') {
        e.preventDefault();
        inputTask.setAttribute('disabled', 'true');
      }

      updateOneTask(index, inputTask.value);
    });
  } else if (e.target && e.target.id === 'delete_task') {
    const taskId = e.target.dataset.id;
    deleteTask(taskId);
    e.target.parentNode.remove(); // remove the task in the browser

    list.innerHTML = '';
    displayAllTasks();
  } else if (e.target && e.target.id === 'check_task') {
    const taskId = e.target.dataset.index;
    const inputTask = e.target.parentElement.querySelector('.reset-input');
    const isCompleted = e.target.checked;

    if (isCompleted) inputTask.classList.add('completed');
    else {
      inputTask.classList.remove('completed');
    }

    updateCompleteTask(taskId, isCompleted);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  createLocalStorage('tasks', []);
  displayAllTasks();
});

clearCompletedBtn.addEventListener('click', () => {
  clearCompleteTasks();
  list.innerHTML = '';
  displayAllTasks();
});
