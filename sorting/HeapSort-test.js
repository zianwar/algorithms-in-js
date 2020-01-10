const test = require('ava');
const heapSort = require('./HeapSort');

test('heapSort', t => {
  const A = [5, 1, 0, 2, 4, 3];
  heapSort(A);
  t.deepEqual(A, [0, 1, 2, 3, 4, 5]);
});

test('heapSort empty array', t => {
  const A = [];
  heapSort(A);
  t.deepEqual(A, []);
});

test('heapSort already sorted array', t => {
  const A = [0, 1, 2, 3, 4, 5];
  heapSort(A);
  t.deepEqual(A, [0, 1, 2, 3, 4, 5]);
});

test('heapSort one element array', t => {
  const A = [-1];
  heapSort(A);
  t.deepEqual(A, [-1]);
});