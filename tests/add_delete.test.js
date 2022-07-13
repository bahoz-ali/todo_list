/**
 * @jest-environment jsdom
 */

import { addData, deleteTask, getData } from '../src/services.js';

describe('add and delete testing', () => {
  it('should add new data into the local storage.', () => {
    const task1 = {
      description: 'Head back home',
      completed: false,
      index: 1,
    };

    const task2 = {
      description: 'clean',
      completed: false,
      index: 2,
    };

    const task3 = {
      description: 'buy new car',
      completed: false,
      index: 3,
    };

    const task4 = {
      description: 'sell the pen!',
      completed: false,
      index: 4,
    };

    addData(task1);
    expect(getData('tasks')).toHaveLength(1);
    expect(getData('tasks')[0].completed).toBe(false);
    addData(task2);
    expect(getData('tasks')).toHaveLength(2);
    expect(getData('tasks')[1].description).toBe('clean');
    addData(task3);
    addData(task4);
    expect(getData('tasks')[3].description).toBe('sell the pen!');
  });

  it('should remove data from the local storage.', () => {
    const task1 = {
      description: 'Head back home',
      completed: false,
      index: 5,
    };

    const task2 = {
      description: 'clean',
      completed: false,
      index: 6,
    };

    addData(task1);
    addData(task2);

    deleteTask(task1.index);

    expect(getData('tasks')).toHaveLength(5);
  });
});
