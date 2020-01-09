const test = require('ava');
const mergeSort = require('./MergeSort');

test('mergeSort', t => {
  const A = [5, 1, 0, 2, 4, 3];
  const sorted = mergeSort(A);
  t.deepEqual(sorted, [0, 1, 2, 3, 4, 5]);
});

test('mergeSort empty array', t => {
  const A = [];
  const sorted = mergeSort(A);
  t.deepEqual(sorted, []);
});

test('mergeSort already sorted array', t => {
  const A = [0, 1, 2, 3, 4, 5];
  const sorted = mergeSort(A);
  t.deepEqual(sorted, A);
});

test('mergeSort one element array', t => {
  const A = [-1];
  const sorted = mergeSort(A);
  t.deepEqual(sorted, A);
});
