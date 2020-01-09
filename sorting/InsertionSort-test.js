const test = require('ava');
const insertionSort = require('./InsertionSort');

test('insertionSort', t => {
  const A = [5, 1, 0, 2, 4, 3];
  insertionSort(A);
  t.deepEqual(A, [0, 1, 2, 3, 4, 5]);
});
