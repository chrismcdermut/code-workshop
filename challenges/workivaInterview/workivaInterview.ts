function workivaInterview(input) {
  // TODO: Implement workivaInterview

  return input;
}

module.exports = workivaInterview;

// Uncomment to run directly
// module.exports.runworkivaInterview = function() {
//   const example = '';
//   console.log(workivaInterview(example));
// };


// function simulateConnectFour() {
//   console.log("Connect Four");
// }

function randomPositionSelection() {

}

function takeTurn() {

}

function checkForConnectedFour() {

}

// observe Board for available spots to put a piece
function seeAvailable(currentBoard) {
  // check availability on currentBoard

  // return options
}

// array of available Indexes
function findAvailableSpotsPerColumn(selectedColum) {
  const availableSpotsInColumn = index;

  return availableSpotsInColumn;
}

function isColumnAvailable(selectedColumn) {
  const isAvailable = false;
  selectedColumn[0] === 'untaken';
}


// randomly select from available spots
function selectedSpot(availableOptions) {
  const gameBoardRepresentation = [
    ['untaken', 'untaken', 'untaken', 'untaken', 'untaken', 'untaken'],
    ['untaken', 'untaken', 'untaken', 'untaken', 'untaken', 'untaken'],
    ['untaken', 'untaken', 'untaken', 'untaken', 'untaken', 'untaken'],
    ['untaken', 'untaken', 'untaken', 'untaken', 'untaken', 'untaken'],
    ['untaken', 'untaken', 'untaken', 'untaken', 'untaken', 'untaken'],
    ['untaken', 'untaken', 'untaken', 'untaken', 'untaken', 'untaken']
      ['untaken', 'untaken', 'untaken', 'untaken', 'untaken', 'untaken']];
  // random choose amongst available Options
  // return the selectedSpot
}

// ie update board
function addPieceToBoard() {

}

function checkPositionAvailability() {
  const gameBoardRepresentation = [
    ['untaken', 'untaken', 'untaken', 'untaken', 'untaken', 'untaken', 'untaken'],
    ['untaken', 'untaken', 'untaken', 'untaken', 'untaken', 'untaken', 'untaken'],
    ['untaken', 'untaken', 'untaken', 'untaken', 'untaken', 'untaken', 'untaken'],
    ['untaken', 'untaken', 'untaken', 'untaken', 'untaken', 'untaken', 'untaken'],
    ['untaken', 'untaken', 'untaken', 'untaken', 'untaken', 'untaken', 'untaken'],
    ['untaken', 'untaken', 'untaken', 'untaken', 'untaken', 'untaken', 'untaken']];
  const positionOptions = 'player1' | 'player2';

  // check if we can add a piece to the row
  // is there an untaken spot in the row
  // does row have any available options (the row below ie outerArray[selectedRowIndex+1] has a piece)
}

// number of connected colors = 4

function runConnectFourGame() {
  // let playerOnePositions = []
  // let playerTwoPositions = []

  // 6 rows by 7 columns
  const numberOfTurnsPossible = 42;
  const currentTurn = 0;

  while (currentTurn < numberOfTurnsPossible) {
    // alternating takes turns and increment the gameplay turns and the playerTurns

    // take turn
    addPieceToGameBoard();

    // incremenet turn for player and game
  }
}

runConnectFourGame();
