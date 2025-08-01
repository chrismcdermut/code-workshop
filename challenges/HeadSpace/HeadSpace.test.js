const HeadSpaceNoteDecoder = require('./HeadSpace');

const words = ['baby', 'referee', 'cat', 'dada', 'dog', 'bird', 'ax', 'baz'];

const testOne = {
  inputWords: words,
  inputNote: 'ctay',
  output: 'cat',
};

const testTwo = {
  inputWords: words,
  inputNote: 'bcanihjsrrrferet',
  output: 'cat',
};

const testThree = {
  inputWords: words,
  inputNote: 'tbaykkjlga',
  output: '-',
};

const testFour = {
  inputWords: words,
  inputNote: 'bbbblkkjbaby',
  output: 'baby',
};

const testFive = {
  inputWords: words,
  inputNote: 'dad',
  output: '-',
};

const testSix = {
  inputWords: words,
  inputNote: 'breakmaking',
  output: 'bird',
};

const testSeven = {
  inputWords: words,
  inputNote: 'dadaa',
  output: 'dada',
};

describe('HeadSpace Test', () => {
  test('testOne', () => {
    const result = HeadSpaceNoteDecoder(testOne.inputWords, testOne.inputNote);
    expect(result).toEqual(testOne.output);
  });

  test('testTwo', () => {
    const result = HeadSpaceNoteDecoder(testTwo.inputWords, testTwo.inputNote);
    expect(result).toEqual(testTwo.output);
  });

  test('testThree', () => {
    const result = HeadSpaceNoteDecoder(testThree.inputWords, testThree.inputNote);
    expect(result).toEqual(testThree.output);
  });

  test('testFour', () => {
    const result = HeadSpaceNoteDecoder(testFour.inputWords, testFour.inputNote);
    expect(result).toEqual(testFour.output);
  });

  test('testFive', () => {
    const result = HeadSpaceNoteDecoder(testFive.inputWords, testFive.inputNote);
    expect(result).toEqual(testFive.output);
  });

  test('testSix', () => {
    const result = HeadSpaceNoteDecoder(testSix.inputWords, testSix.inputNote);
    expect(result).toEqual(testSix.output);
  });

  test('testSeven', () => {
    const result = HeadSpaceNoteDecoder(testSeven.inputWords, testSeven.inputNote);
    expect(result).toEqual(testSeven.output);
  });
});
