const test = require('ava');
const mergeSort = require('./MergeSort');

test('mergeSort', t => {
  const A = [5, 1, 0, 2, 4, 3];
  const sorted = mergeSort(A);
  t.deepEqual(sorted, [0, 1, 2, 3, 4, 5]);
});
