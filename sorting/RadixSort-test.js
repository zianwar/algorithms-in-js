const test = require('ava');
const radixSort = require('./RadixSort');

test.skip('radixSort', t => {
  const A = [5, 1, 0, 2, 4, 3];
  radixSort(A);
  t.deepEqual(A, [0, 1, 2, 3, 4, 5]);
});
