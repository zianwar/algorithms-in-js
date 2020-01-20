/*
Quick Sort
When implemented well, it can be about two or three times faster
than merge sort and heapsort.

==== Time ====
Average Case: O(nlogn)
Worst Case: O(n^2)

=== Space ====
O(1)
*/

function quickSort(A) {
  return quickSortHelper(A, 0, A.length - 1);
}

function quickSortHelper(A, startIndex, endIndex) {
  if (startIndex >= endIndex) return [A[startIndex]];
  const pivotIndex = partition(A, startIndex, endIndex);

  quickSortHelper(A, startIndex, pivotIndex);
  quickSortHelper(A, pivotIndex + 1, endIndex);
  return A;
}

function partition(A, startIndex, endIndex) {
  let pivotIndex = startIndex;
  let i = startIndex;
  while (i <= endIndex) {
    if (A[i] < A[pivotIndex]) {
      swap(A, i, pivotIndex);
      pivotIndex = i;
    }
    i++;
  }
  return pivotIndex;
}

function swap(A, i, j) {
  const tmp = A[i];
  A[i] = A[j];
  A[j] = tmp;
}

module.exports = quickSort;