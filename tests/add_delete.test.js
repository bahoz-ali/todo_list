/**
 * @jest-environment jsdom
 */

import {
  addData,
  clearLocalStorage,
  deleteTask,
  getData,
  updateOneTask,
} from '../src/services.js';
import {
  clearCompleteTasks,
  updateCompleteTask,
} from '../src/update_complete.js';

const tasks = [
  {
    description: 'Head back home',
    completed: false,
    index: 1,
  },
  {
    description: 'clean',
    completed: false,
    index: 2,
  },
  {
    description: 'buy new car',
    completed: false,
    index: 3,
  },
  {
    description: 'sell the pen!',
    completed: false,
    index: 4,
  },
];

describe('add and delete testing', () => {
  it('should add new data into the local storage.', () => {
    clearLocalStorage();

    addData(tasks[0]);
    expect(getData('tasks')).toHaveLength(1);
    expect(getData('tasks')[0].completed).toBe(false);

    addData(tasks[1]);
    expect(getData('tasks')).toHaveLength(2);
    expect(getData('tasks')[1].description).toBe('clean');

    addData(tasks[2]);
    addData(tasks[3]);
    expect(getData('tasks')[3].description).toBe('sell the pen!');
  });

  it('should remove data from the local storage.', () => {
    clearLocalStorage();

    addData(tasks[0]);
    addData(tasks[1]);

    deleteTask(tasks[0].index);

    expect(getData('tasks')).toHaveLength(1);
  });
});

describe('change description and complete tasks and clear all complete tasks', () => {
  it('should update the description of the task', () => {
    clearLocalStorage();

    addData(tasks[3]);

    const newDescription = 'clean the window';
    updateOneTask(tasks[3].index, newDescription);

    expect(getData('tasks')[0].description).toBe(newDescription);
  });

  it('should convert the un completed task to complete task(true) if user update it', () => {
    clearLocalStorage();

    addData(tasks[0]);
    updateCompleteTask(tasks[0].index, true);

    expect(getData('tasks')[0].completed).toBeTruthy();
  });

  it('should convert the completed task to un completed task(false) if user update it', () => {
    clearLocalStorage();

    tasks[0].completed = true;
    addData(tasks[0]);
    updateCompleteTask(tasks[0].index, false);

    expect(getData('tasks')[0].completed).toBeFalsy();
  });

  it('should clear all the completed tasks', () => {
    clearLocalStorage();

    tasks[0].completed = true;
    tasks[1].completed = false;
    tasks[2].completed = false;
    tasks[3].completed = true;

    addData(tasks[0]);
    addData(tasks[1]);
    addData(tasks[2]);
    addData(tasks[3]);

    clearCompleteTasks();
    expect(getData('tasks')).toHaveLength(2);

    updateCompleteTask(tasks[1].index, true);
    clearCompleteTasks();
    expect(getData('tasks')).toHaveLength(1);
  });
});
