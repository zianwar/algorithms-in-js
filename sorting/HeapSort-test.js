const test = require('ava');
const heapSort = require('./HeapSort');

test('heapSort', t => {
  const A = [5, 1, 0, 2, 4, 3];
  const sorted = heapSort(A);
  t.deepEqual(sorted, [0, 1, 2, 3, 4, 5]);
});
