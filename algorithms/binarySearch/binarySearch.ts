function binarySearch(list: number[], lookFor: number): number {
  let min = 0;
  let max = list.length;
  let middle: number;

  // while there is something to search for
  while (min <= max) {
    const pseudoLength = max - min;
    middle = Math.floor((min + max) / 2);
    if (list[middle] === lookFor) {
      return middle;
    }
    if (pseudoLength === 1 && list[middle] !== lookFor) {
      return -1; /* TODO: consolidate return statements */
    }
    // eslint-disable-next-line no-unused-expressions
    list[middle] < lookFor ? (min = middle) : (max = middle);
  }
  // TODO: cover this line or change
  return -1; /* TODO: consolidate return statements */
}

function seekElementBinarySearch(array: number[], seekingElement: number): number {
  let bottomElementIndex = 0;
  let topElementIndex = array.length - 1;
  let middleIndex: number;

  let finalIndex = -1;
  while (bottomElementIndex <= topElementIndex) {
    middleIndex = Math.floor((bottomElementIndex + topElementIndex) / 2);

    if (array[middleIndex] === seekingElement) {
      finalIndex = middleIndex;// we need return finalIndex
      return finalIndex;
    }
    // what if topElementIndex = 0?
    if (array[middleIndex] < seekingElement) {
      // bottomElementIndex is inclusive, and we already compared seekingElement
      // with middleIndex @ line TODO.
      bottomElementIndex = middleIndex + 1;
    } else {
      topElementIndex = middleIndex;
    }
  }
  return finalIndex;
}

export { binarySearch, seekElementBinarySearch };

// TODO: make this take arguments
export function runBinarySearch(): void {
  const exampleList = [1, 2, 3, 4, 7, 11, 14, 16, 23, 34, 56, 67, 89, 91];
  // answer 11
  console.log(binarySearch(exampleList, 67)); /* eslint-disable-line no-console */
}