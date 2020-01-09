const test = require('ava');
const quickSort = require('./QuickSort');

test('quickSort', t => {
  const A = [5, 1, 0, 2, 4, 3];
  const sorted = quickSort(A);
  t.deepEqual(sorted, [0, 1, 2, 3, 4, 5]);
});
