// ==== Time ====
// O(n * (n*(n-1)/2) ) ~ O(n^2)
// If array is already sorted => O(n)
// Good if array is relatively sorted
//
// ==== Space ====
// O(1)
function insertionSort(A) {
  for (let i = 1; i < A.length; i++) {
    let tmp = A[i];
    let j = i - 1;
    while (j >= 0 && A[j] > tmp) {
      A[j + 1] = A[j];
      j--;
    }
    A[j + 1] = tmp;
  }
  return A;
}


module.exports = insertionSort;