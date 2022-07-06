export function saveTOLocalStorage() {}

export function createLocalStorage(key = 'tasks', value = []) {
  if (!getData(key)) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getData(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return localStorage.getItem(key);
  }
}

export function addData(obj) {
  console.log({obj})
  const tasks = getData('tasks');
  tasks.push(obj)
  localStorage.setItem('tasks', JSON.stringify(tasks));

  return tasks;
}

export function setData() {}
