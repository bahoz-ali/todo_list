export function saveTOLocalStorage() {}

export function createLocalStorage(key = 'tasks', value=[]) {
  if (!getData(key)) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getData(key) {
  try {
    return JSON.stringify(localStorage.getItem(key));
  } catch (error) {
    return localStorage.getItem(key);
  }
}

export function setData() {}
