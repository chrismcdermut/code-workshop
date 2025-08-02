#!/usr/bin/env node

// Simple wrapper to run Functional Connect Four with command line arguments
const { runFunctionalConnectFour } = require('./connectFourFunctional.ts');

// Get the first player from command line arguments
const firstPlayer = process.argv[2];

if (firstPlayer && firstPlayer !== 'P1' && firstPlayer !== 'P2') {
  // eslint-disable-next-line no-console
  console.log('Invalid player. Please use P1 or P2.');
  process.exit(1);
}

runFunctionalConnectFour(firstPlayer);
