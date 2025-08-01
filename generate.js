#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2);

// Run the TypeScript file with arguments, allowing interactive mode
const tsFile = path.join(__dirname, 'helpers', 'generateBoilerPlate.ts');
const child = spawn('npx', ['ts-node', tsFile, ...args], {
  stdio: 'inherit',
  shell: true,
});

child.on('error', (error) => {
  console.error('Error running generator:', error.message);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code || 0);
});
