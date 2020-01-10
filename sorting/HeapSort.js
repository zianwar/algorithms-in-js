function heapSort(A) {
  buildHeap(A);
  let heapEndIndex = A.length - 1;
  while (heapEndIndex >= 0) {
    swap(A, 0, heapEndIndex--);
    heapify(A, heapEndIndex);
  }
}

function buildHeap(A) {
  for (let i = 1; i < A.length; i++) {
    heapify(A, i);
  }
}

function heapify(A, endIndex) {
  let i = endIndex;
  while (i > 0) {
    const parentIndex = Math.floor(i / 2);
    if (A[i] > A[parentIndex]) {
      swap(A, i, parentIndex);
    }
    i--;
  }
}

function swap(A, i, j) {
  const tmp = A[i];
  A[i] = A[j];
  A[j] = tmp;
}


module.exports = heapSort;