/**
 * @jest-environment jsdom
 */


import {addData, getData} from '../src/services.js'



describe('add and delete testing', () => {
  it('should be test', () => {
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
    addData(task1);
    expect(getData('tasks')).toHaveLength(1);
    expect(getData('tasks')[0].completed).toBe(false);
    addData(task2);
    expect(getData('tasks')).toHaveLength(2);
    expect(getData('tasks')[1].description).toBe('clean');
  });


});
