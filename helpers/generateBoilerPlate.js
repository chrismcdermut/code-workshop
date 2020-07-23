const fs = require('fs');

// TODO: make this take arguments
// ////SETUP HERE//////
const solutionName = 'findDuplicateInLL';
// TODO: look into setting up map or enum for this
/* challenge || dataStructure || algorithm || designPattern || conept */
const codeChallengeType = 'challenge';

// ////UNIFORM SPEC/NOTES BOILERPLATE//////
const spec = `${solutionName} Spec goes here!`;
const notes = `${solutionName} Notes go here!`;

// ////CHALLENGES BOILERPLATE//////
const CHALLENGES_DIR = 'challenges';

// TODO: rename these challenge variables
const solutionJS = `function ${solutionName}(input) {

}

module.exports = ${solutionName};
`;

const solutionTestJS = `const ${solutionName} = require('./${solutionName}')

const testOne = {
  input: '',
  output: ''
}

describe('${solutionName} Test', () => {

  test('testOne', ()=>{
    let result = ${solutionName}(testOne.input)
    expect(result).toEqual(testOne.output);
  });

});
`;

// ////DATA STRUCTURES BOILERPLATE//////
const DATA_STRUCTURES_DIR = 'dataStructures';

const dataStructureClassBP = `class ${solutionName} {
  constructor() {
  }
}

module.exports = ${solutionName};
`;

const dataStructureTestBP = `const ${solutionName} = require('./${solutionName}')

const testOne = {
  input: '',
  output: ''
}

describe('${solutionName} Test', () => {

  test('testOne', ()=>{
    let result = ${solutionName}(testOne.input)
    expect(result).toEqual(testOne.output);
  });

});
`;

// ////DATA STRUCTURES BOILERPLATE//////
const ALGORITHMS_DIR = 'algorithms';

const algorithmJS = `function ${solutionName}(input) {

}

module.exports = ${solutionName};
`;

const algorithmTestJS = `const ${solutionName} = require('./${solutionName}')

const testOne = {
  input: '',
  output: ''
}

describe('${solutionName} Test', () => {

  test('testOne', ()=>{
    let result = ${solutionName}(testOne.input)
    expect(result).toEqual(testOne.output);
  });

});
`;

// ////EXECUTION CODE//////
let directory = '';
let boilerPlateCode = '';
let boilerPlateTest = '';

// TODO: look into using map for this, switch might be code smell?
switch (codeChallengeType) {
  case 'challenge':
    directory = CHALLENGES_DIR;
    boilerPlateCode = solutionJS;
    boilerPlateTest = solutionTestJS;
    break;
  case 'algorithm':
    directory = ALGORITHMS_DIR;
    boilerPlateCode = algorithmJS;
    boilerPlateTest = algorithmTestJS;
    break;
  case 'dataStructure':
  default:
    directory = DATA_STRUCTURES_DIR;
    boilerPlateCode = dataStructureClassBP;
    boilerPlateTest = dataStructureTestBP;
}

module.exports.generateDefaultBoilerPlate = function () {
  // make folder with solution name
  // Creates /tmp/a/apple, regardless of whether `/tmp` and /tmp/a exist.
  fs.mkdir(`./${directory}/${solutionName}`, { recursive: true }, (err) => {
    if (err) throw err;
  });

  // make spec.md file -> //make ${solution}Spec.md file
  fs.writeFile(
    `./${directory}/${solutionName}/${solutionName}Spec.md`,
    spec,
    (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;
      // success case, the file was saved
      console.log(`${solutionName}Spec.md saved!`);
    },
  );

  // make notes.md file -> //make ${solution}notes.md file
  fs.writeFile(
    `./${directory}/${solutionName}/${solutionName}Notes.md`,
    notes,
    (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;
      // success case, the file was saved
      console.log(`${solutionName}Notes.md saved!`);
    },
  );

  // make solution.js file -> //make ${solution}solution.js file
  fs.writeFile(
    `./${directory}/${solutionName}/${solutionName}.js`,
    boilerPlateCode,
    (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;
      // success case, the file was saved
      console.log(`${solutionName}.js saved!`);
    },
  );

  // make solution.test.js file -> //make ${solution}solution.test.js file
  fs.writeFile(
    `./${directory}/${solutionName}/${solutionName}.test.js`,
    boilerPlateTest,
    (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;
      // success case, the file was saved
      console.log(`${solutionName}.test.js saved!`);
    },
  );
};

// //////////NOTES////////////
// TODO:: make dynamic BP
// ////DYNAMIC BOILERPLATE ATTEMPT//////
// const codeMap = {
//   dataStructures: {
//     name: 'dataStructures',
//     directory: 'dataStructures',
//     boilerPlate: `class ${solutionName} {
//       constructor() {
//       }
//     }
//
//     module.exports = ${solutionName};
//     `,
//   },
// };
