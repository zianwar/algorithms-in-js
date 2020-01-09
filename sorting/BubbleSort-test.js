const test = require('ava');
const bubbleSort = require('./BubbleSort');

test('bubbleSort', t => {
  const A = [5, 1, 0, 2, 4, 3];
  bubbleSort(A);
  t.deepEqual(A, [0, 1, 2, 3, 4, 5]);
});
