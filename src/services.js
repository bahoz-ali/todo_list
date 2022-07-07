export function saveTOLocalStorage() {}

export function getData(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return localStorage.getItem(key);
  }
}

export function createLocalStorage(key = 'tasks', value = []) {
  if (!getData(key)) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function updateTasks(data) {
  localStorage.setItem('tasks', JSON.stringify(data));
}

export function updateIndexes() {
  let tasks = getData('tasks');

  tasks = tasks.map((task, index) => ({ ...task, index: index + 1 }));

  updateTasks(tasks);
}

export function addData(obj) {
  const tasks = getData('tasks');
  tasks.push(obj);
  updateTasks(tasks);

  return tasks;
}

export function deleteTask(id) {
  let tasks = getData('tasks');

  if (typeof id === 'string') id = Number(id);

  tasks = tasks.filter((task) => task.index !== id);
  updateTasks(tasks);
  updateIndexes();
}

export function updateOneTask(id, description) {
  if (typeof id === 'string') id = Number(id);

  let tasks = getData('tasks');

  tasks = tasks.map((task) => {
    if (id === task.index) {
      return { ...task, description };
    }

    return task;
  });

  updateTasks(tasks);
}
