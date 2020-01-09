
function mergeSort(A) {
  if (!A.length) return A;
  return mergeSortHelper(A, 0, A.length - 1);
}

function mergeSortHelper(A, startIndex, endIndex) {
  if (startIndex >= endIndex) return [A[startIndex]];

  const middleIndex = Math.floor((startIndex + endIndex) / 2);
  const left = mergeSortHelper(A, startIndex, middleIndex);
  const right = mergeSortHelper(A, middleIndex + 1, endIndex);

  return merge(left, right);
}

function merge(left, right) {
  let i = 0;
  let j = 0;
  const merged = [];
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      merged.push(left[i++]);
    } else if (left[i] > right[j]) {
      merged.push(right[j++]);
    } else {
      merged.push(left[i++], right[j++]);
    }
  }
  while (i < left.length) merged.push(left[i++]);
  while (j < right.length) merged.push(right[j++]);
  return merged;
}


module.exports = mergeSort;