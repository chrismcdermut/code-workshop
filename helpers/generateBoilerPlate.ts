import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

type CodeChallengeType = 'challenge' | 'dataStructure' | 'algorithm' | 'designPattern' | 'concepts';

interface BoilerplateConfig {
  directory: string;
  useClassTemplate: boolean;
}

const BOILERPLATE_CONFIGS: Record<CodeChallengeType, BoilerplateConfig> = {
  concepts: {
    directory: 'concepts',
    useClassTemplate: false,
  },
  challenge: {
    directory: 'challenges',
    useClassTemplate: false,
  },
  dataStructure: {
    directory: 'dataStructures',
    useClassTemplate: true,
  },
  algorithm: {
    directory: 'algorithms',
    useClassTemplate: false,
  },
  designPattern: {
    directory: 'designPatterns',
    useClassTemplate: true,
  },
};

// Template generators
const getFunctionTemplate = (name: string) => `function ${name}(input) {
  // TODO: Implement ${name}

  return input;
}

module.exports = ${name};

// Uncomment to run directly
// module.exports.run${name} = function() {
//   const example = '';
//   console.log(${name}(example));
// };
`;

const getClassTemplate = (name: string) => `class ${name} {
  constructor() {
    // TODO: Initialize ${name}
  }

  // TODO: Add methods
}

module.exports = ${name};

// Uncomment to run directly
// module.exports.run${name} = function() {
//   const instance = new ${name}();
//   console.log(instance);
// };
`;

const getFunctionTestTemplate = (name: string) => `const ${name} = require('./${name}');

describe('${name} Test', () => {
  test('should handle basic case', () => {
    const testCase = {
      input: '',
      expected: ''
    };

    const result = ${name}(testCase.input);
    expect(result).toEqual(testCase.expected);
  });

  test('should handle edge case', () => {
    // TODO: Add edge case test
  });

  test('should handle empty input', () => {
    // TODO: Add empty input test
  });
});
`;

const getClassTestTemplate = (name: string) => `const ${name} = require('./${name}');

describe('${name} Test', () => {
  let instance;

  beforeEach(() => {
    instance = new ${name}();
  });

  test('should create instance', () => {
    expect(instance).toBeDefined();
    expect(instance).toBeInstanceOf(${name});
  });

  test('should initialize correctly', () => {
    // TODO: Test initial state
  });

  test('should handle operations', () => {
    // TODO: Test main operations
  });
});
`;

function generateBoilerPlate(solutionName: string, challengeType: CodeChallengeType): void {
  const config = BOILERPLATE_CONFIGS[challengeType];

  if (!config) {
    console.error(`Invalid challenge type: ${challengeType}`);
    console.error(`Valid types are: ${Object.keys(BOILERPLATE_CONFIGS).join(', ')}`);
    process.exit(1);
  }

  const { directory, useClassTemplate } = config;
  const targetPath = path.join(directory, solutionName);

  // Create directory synchronously to ensure it exists before creating files
  try {
    fs.mkdirSync(targetPath, { recursive: true });
    console.log(`📁 Directory created: ${targetPath}`);
  } catch (err) {
    console.error('Error creating directory:', err);
    process.exit(1);
  }

  // Create spec file
  const specContent = `# ${solutionName} Specification

## Problem Description
${solutionName} spec goes here!

## Input
- Describe the input format
- Include type information
- Specify any constraints

## Output
- Describe the expected output format
- Include type information

## Examples
\`\`\`typescript
Example 1:
Input:
Output:

Example 2:
Input:
Output:
\`\`\`

## Constraints
- List any constraints on input size
- Time complexity requirements
- Space complexity requirements

## Edge Cases
- Empty input
- Single element
- Maximum values
- Minimum values
`;

  try {
    fs.writeFileSync(
      path.join(targetPath, `${solutionName}Spec.md`),
      specContent
    );
    console.log(`📄 ${solutionName}Spec.md saved!`);
  } catch (err) {
    console.error('Error creating spec file:', err);
    process.exit(1);
  }

  // Create notes file
  const notesContent = `# ${solutionName} Notes

## Approach
Describe your approach here

## Algorithm Steps
1. Step one
2. Step two
3. Step three

## Time Complexity
- Best case: O(?)
- Average case: O(?)
- Worst case: O(?)

## Space Complexity
- O(?)

## Key Insights
- List key insights and observations
- Any patterns recognized
- Similar problems

## Alternative Approaches
- Describe other possible solutions
- Trade-offs between approaches

## Common Mistakes
- List common pitfalls
- Edge cases to watch for
`;

  try {
    fs.writeFileSync(
      path.join(targetPath, `${solutionName}Notes.md`),
      notesContent
    );
    console.log(`📝 ${solutionName}Notes.md saved!`);
  } catch (err) {
    console.error('Error creating notes file:', err);
    process.exit(1);
  }

  // Create main TypeScript file
  const codeTemplate = useClassTemplate
    ? getClassTemplate(solutionName)
    : getFunctionTemplate(solutionName);

  try {
    fs.writeFileSync(
      path.join(targetPath, `${solutionName}.ts`),
      codeTemplate
    );
    console.log(`📦 ${solutionName}.ts saved!`);
  } catch (err) {
    console.error('Error creating TypeScript file:', err);
    process.exit(1);
  }

  // Create test TypeScript file
  const testTemplate = useClassTemplate
    ? getClassTestTemplate(solutionName)
    : getFunctionTestTemplate(solutionName);

  try {
    fs.writeFileSync(
      path.join(targetPath, `${solutionName}.test.ts`),
      testTemplate
    );
    console.log(`🧪 ${solutionName}.test.ts saved!`);
  } catch (err) {
    console.error('Error creating test file:', err);
    process.exit(1);
  }

  console.log(`\n✅ Successfully created ${solutionName} ${challengeType}!`);
  console.log(`📍 Location: ${targetPath}\n`);
  console.log(`Next steps:`);
  console.log(`1. Edit ${targetPath}/${solutionName}Spec.md to define the problem`);
  console.log(`2. Implement the solution in ${targetPath}/${solutionName}.ts`);
  console.log(`3. Add test cases to ${targetPath}/${solutionName}.test.ts`);
  console.log(`4. Run tests with: npm test ${targetPath}/${solutionName}.test.ts`);
}

// Interactive prompt helper
async function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// Interactive mode
async function interactiveMode(): Promise<void> {
  console.log('\n📚 Code Practice Boilerplate Generator\n');

  // Get solution name
  const solutionName = await prompt('Enter the name for your solution (e.g., TwoSum, LinkedList): ');

  if (!solutionName) {
    console.error('\n❌ Solution name cannot be empty!\n');
    process.exit(1);
  }

  // Show challenge types
  console.log('\nSelect a challenge type:\n');
  console.log('  1) challenge      - Coding challenges (function-based)');
  console.log('  2) dataStructure  - Data structure implementations (class-based)');
  console.log('  3) algorithm      - Algorithm implementations (function-based)');
  console.log('  4) designPattern  - Design pattern implementations (class-based)');
  console.log('  5) concepts       - JavaScript/programming concepts (function-based)\n');

  const typeChoice = await prompt('Enter your choice (1-5): ');

  const typeMap: Record<string, CodeChallengeType> = {
    '1': 'challenge',
    '2': 'dataStructure',
    '3': 'algorithm',
    '4': 'designPattern',
    '5': 'concepts',
  };

  const challengeType = typeMap[typeChoice];

  if (!challengeType) {
    console.error('\n❌ Invalid choice! Please select 1-5.\n');
    process.exit(1);
  }

  console.log(`\n🚀 Creating ${solutionName} as ${challengeType}...\n`);
  generateBoilerPlate(solutionName, challengeType);
}

// Parse command line arguments
async function main(): Promise<void> {
  const args = process.argv.slice(2);

  // If no arguments provided, run interactive mode
  if (args.length === 0) {
    await interactiveMode();
    return;
  }

  // If only one argument, assume it's the name and prompt for type
  if (args.length === 1) {
    const solutionName = args[0];
    console.log(`\n📚 Creating boilerplate for: ${solutionName}\n`);
    console.log('Select a challenge type:\n');
    console.log('  1) challenge      - Coding challenges (function-based)');
    console.log('  2) dataStructure  - Data structure implementations (class-based)');
    console.log('  3) algorithm      - Algorithm implementations (function-based)');
    console.log('  4) designPattern  - Design pattern implementations (class-based)');
    console.log('  5) concepts       - JavaScript/programming concepts (function-based)\n');

    const typeChoice = await prompt('Enter your choice (1-5): ');

    const typeMap: Record<string, CodeChallengeType> = {
      '1': 'challenge',
      '2': 'dataStructure',
      '3': 'algorithm',
      '4': 'designPattern',
      '5': 'concepts',
    };

    const challengeType = typeMap[typeChoice];

    if (!challengeType) {
      console.error('\n❌ Invalid choice! Please select 1-5.\n');
      process.exit(1);
    }

    generateBoilerPlate(solutionName, challengeType);
    return;
  }

  // If two arguments provided, use them directly
  const [solutionName, challengeType] = args;

  if (!Object.keys(BOILERPLATE_CONFIGS).includes(challengeType)) {
    console.error(`\n❌ Invalid challenge type: ${challengeType}`);
    console.error(`Valid types are: ${Object.keys(BOILERPLATE_CONFIGS).join(', ')}\n`);
    console.error('Run without arguments for interactive mode.\n');
    process.exit(1);
  }

  generateBoilerPlate(solutionName, challengeType as CodeChallengeType);
}

// Run the script if it's executed directly
if (require.main === module) {
  main().catch(console.error);
}

export default generateBoilerPlate;