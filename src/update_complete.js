/* eslint-disable import/extensions */
import { getData, updateIndexes, updateTasks } from './services';

export function updateCompleteTask(id, isCompleted = false) {
  if (id === null) return;

  if (typeof id === 'string') id = Number(id);

  let tasks = getData('tasks');

  tasks = tasks.map((task) => {
    if (id === task.index) {
      return { ...task, completed: isCompleted };
    }

    return task;
  });

  updateTasks(tasks);
}

export function clearCompleteTasks() {
  let tasks = getData('tasks');

  tasks = tasks.filter((task) => !task.completed);

  updateTasks(tasks);
  updateIndexes();
}
