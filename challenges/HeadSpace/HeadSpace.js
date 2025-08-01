// function HeadSpace(words, note) {

// }

function createCharCountObject(word) {
  const charCountObj = {};
  for (let i = 0; i < word.length; i += 1) {
    if (!charCountObj[word[i]]) { charCountObj[word[i]] = 0; }
    charCountObj[word[i]] += 1;
  }
  return charCountObj;
}

function HeadSpaceNoteDecoder(words, note) {
  // spec 1read through note and tally chars
  const noteCharCountObj = createCharCountObject(note);

  let foundWord = '-';

  // spec 2 read through words and tally letters
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const wordCharCountObj = createCharCountObject(word);
    let isPossible = true;

    Object.keys(wordCharCountObj).forEach((char) => {
      if (!noteCharCountObj[char]) {
        isPossible = false;
      }
      if (wordCharCountObj[char] > noteCharCountObj[char]) {
        isPossible = false;
      }
    });

    if (isPossible) {
      foundWord = word;
      break; // Return the first possible word
    }
  }

  // compare words against note to see if the word letter count is less than the note letter counts
  // return possible word or -
  return foundWord;
}

module.exports = HeadSpaceNoteDecoder;
