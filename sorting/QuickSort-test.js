const test = require('ava');
const quickSort = require('./QuickSort');

test('quickSort', t => {
  const A = [5, 1, 0, 2, 4, 3];
  const B = [3, 2, 1, 0];
  quickSort(A);
  t.deepEqual(A, [0, 1, 2, 3, 4, 5]);

  quickSort(B);
  t.deepEqual(B, [0, 1, 2, 3]);
});

test('quickSort empty array', t => {
  const A = [];
  quickSort(A);
  t.deepEqual(A, []);
});

test('quickSort already sorted array', t => {
  const A = [0, 1, 2, 3, 4, 5];
  quickSort(A);
  t.deepEqual(A, [0, 1, 2, 3, 4, 5]);
});

test('quickSort one element array', t => {
  const A = [-1];
  quickSort(A);
  t.deepEqual(A, [-1]);
});
