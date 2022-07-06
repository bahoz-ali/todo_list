import './style.css';

const list = document.querySelector('.todo_list');

const tasks = [
  { description: 'Buy new phone', completed: false, index: 1 },
  { description: 'go to cafe', completed: false, index: 2 },
  { description: 'write a new book', completed: false, index: 3 },
];

function displayTodo() {
  tasks.forEach(({ completed, description }) => {
    const li = document.createElement('li');
    li.classList.add('item');

    li.innerHTML = `<div class="group"><input type="checkbox" ${
      completed && 'checked'
    }/>
                     <p>${description}</p> </div> 
                     <i class="fa-solid fa-ellipsis-vertical"></i>`;

    list.appendChild(li);
  });
}

displayTodo();
