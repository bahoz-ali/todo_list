import './style.css';
const list = document.querySelector('.todo_list');

const todos = [
  { description: 'Buy new phone', completed: false, index: 1 },
  { description: 'go to cafe', completed: false, index: 2 },
  { description: 'write a new book', completed: false, index: 3 },
];

function displayTodo() {
  todos.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('item');

    li.innerHTML = ` `;
  });
}

displayTodo();
