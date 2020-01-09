// ==== Time ====
// O(n * (n*(n-1)/2) ) ~ O(n^2)
// If array is already sorted => O(n)
// Good if array is relatively sorted
//
// ==== Space ====
// O(1)
function bubbleSort(A) {
  let sorted = false;
  for (let i = 0; i < A.length && !sorted; i++) {
    sorted = true;
    for (let j = 0; j < A.length - i + 1; j++) {
      if (A[j + 1] < A[j]) {
        const tmp = A[j];
        A[j] = A[j + 1];
        A[j + 1] = tmp;
        sorted = false;
      }
    }
  }
}


module.exports = bubbleSort;