const test = require('ava');
const selectionSort = require('./SelectionSort');

test('selectionSort', t => {
  const A = [5, 1, 0, 2, 4, 3];
  selectionSort(A);
  t.deepEqual(A, [0, 1, 2, 3, 4, 5]);
});
