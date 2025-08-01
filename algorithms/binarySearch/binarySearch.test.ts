import { binarySearch, seekElementBinarySearch, runBinarySearch } from './binarySearch';

describe('binarySearch Test', () => {
  test('testOne', () => {
    const testOne = {
      input: [4, 8, 15, 16, 23, 42],
      inputLookFor: 15,
      output: 2,
    };
    const result = binarySearch(testOne.input, testOne.inputLookFor);
    expect(result).toEqual(testOne.output);
  });

  test('testTwo', () => {
    const testTwo = {
      input: [1, 2, 3, 4, 7, 11, 14, 16, 23, 34, 56, 67, 89, 91],
      inputLookFor: 67,
      output: 11,
    };
    const result = binarySearch(testTwo.input, testTwo.inputLookFor);
    expect(result).toEqual(testTwo.output);
  });

  test('testThree', () => {
    const testThree = {
      input: [1, 2, 3, 4, 7, 11, 14, 16, 23, 34, 56, 67, 89, 91],
      inputLookFor: 200,
      output: -1,
    };
    const result = binarySearch(testThree.input, testThree.inputLookFor);
    expect(result).toEqual(testThree.output);
  });

  test('testFour', () => {
    const testFour = {
      input: [1, 3, 5, 7, 9, 10, 56, 78, 90, 100, 1001],
      inputLookFor: 9,
      output: 4,
    };
    const result = binarySearch(testFour.input, testFour.inputLookFor);
    expect(result).toEqual(testFour.output);
  });

  test('testFive', () => {
    const testFive = {
      input: [1, 3, 5, 7, 9, 10, 56, 78, 90, 100, 1001],
      inputLookFor: 3,
      output: 1,
    };
    const result = binarySearch(testFive.input, testFive.inputLookFor);
    expect(result).toEqual(testFive.output);
  });

  test('testSix', () => {
    const testSix = {
      input: [1, 2, 3, 4, 7, 11, 14, 16, 23, 34, 56, 67, 89, 91],
      answerObject: {
        1: 0,
        2: 1,
        3: 2,
        4: 3,
        7: 4,
        11: 5,
        14: 6,
        16: 7,
        23: 8,
        34: 9,
        56: 10,
        67: 11,
        89: 12,
        91: 13,
      } as Record<number, number>,
      output: true,
    };
    let result = true;
    const array = testSix.input;
    for (let i = 0; i < array.length; i++) {
      if (binarySearch(array, array[i]) !== testSix.answerObject[array[i]]) {
        result = false;
      }
    }

    expect(result).toEqual(testSix.output);
  });

  test('testSeven', () => {
    const testSeven = {
      input: [1, 3, 5, 7, 9, 10, 56, 78, 90, 100, 1001],
      inputLookFor: 2,
      output: -1,
    };
    const result = binarySearch(testSeven.input, testSeven.inputLookFor);
    expect(result).toEqual(testSeven.output);
  });
});

describe('seekElementBinarySearch Test', () => {
  test('testOne', () => {
    const testOne = {
      input: [4, 8, 15, 16, 23, 42],
      inputLookFor: 15,
      output: 2,
    };
    const result = seekElementBinarySearch(testOne.input, testOne.inputLookFor);
    expect(result).toEqual(testOne.output);
  });

  test('testTwo', () => {
    const testTwo = {
      input: [1, 2, 3, 4, 7, 11, 14, 16, 23, 34, 56, 67, 89, 91],
      inputLookFor: 67,
      output: 11,
    };
    const result = seekElementBinarySearch(testTwo.input, testTwo.inputLookFor);
    expect(result).toEqual(testTwo.output);
  });

  test('testThree', () => {
    const testThree = {
      input: [1, 2, 3, 4, 7, 11, 14, 16, 23, 34, 56, 67, 89, 91],
      inputLookFor: 200,
      output: -1,
    };
    const result = seekElementBinarySearch(testThree.input, testThree.inputLookFor);
    expect(result).toEqual(testThree.output);
  });

  test('testFour', () => {
    const testFour = {
      input: [1, 3, 5, 7, 9, 10, 56, 78, 90, 100, 1001],
      inputLookFor: 9,
      output: 4,
    };
    const result = seekElementBinarySearch(testFour.input, testFour.inputLookFor);
    expect(result).toEqual(testFour.output);
  });

  test('testFive', () => {
    const testFive = {
      input: [1, 3, 5, 7, 9, 10, 56, 78, 90, 100, 1001],
      inputLookFor: 3,
      output: 1,
    };
    const result = seekElementBinarySearch(testFive.input, testFive.inputLookFor);
    expect(result).toEqual(testFive.output);
  });

  test('testSix', () => {
    const testSix = {
      input: [1, 2, 3, 4, 7, 11, 14, 16, 23, 34, 56, 67, 89, 91],
      answerObject: {
        1: 0,
        2: 1,
        3: 2,
        4: 3,
        7: 4,
        11: 5,
        14: 6,
        16: 7,
        23: 8,
        34: 9,
        56: 10,
        67: 11,
        89: 12,
        91: 13,
      } as Record<number, number>,
      output: true,
    };
    let result = true;
    const array = testSix.input;

    for (let i = 0; i < array.length; i++) {
      if (seekElementBinarySearch(array, array[i]) !== testSix.answerObject[array[i]]) {
        result = false;
      }
    }

    expect(result).toEqual(testSix.output);
  });
});

describe('runBinarySearch Test', () => {
  test('testOne', () => {
    console.log = jest.fn(); /* eslint-disable-line no-console */
    runBinarySearch();
    const answer = 11;
    expect(console.log).toHaveBeenCalledWith(answer); /* eslint-disable-line no-console */
  });
});