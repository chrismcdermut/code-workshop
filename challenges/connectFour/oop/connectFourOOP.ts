class ConnectFourGame {
  gameBoard: (null | string)[][];

  gameIsWon = false;

  currentPlayer: string;

  constructor(firstPlayer = 'P1') {
    this.currentPlayer = firstPlayer;
    this.gameBoard = [
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
    ];
  }

  static selectedAvailableColumnIndexRandomly(availableColumns: number[]): number {
    // Randomly select a column index from the available columns
    const selectedColumnIndex = Math.floor(Math.random() * availableColumns.length);
    return availableColumns[selectedColumnIndex];
  }

  static availableColumnsIndexes(gameboard: (null | string)[][]): number[] {
    // Return an array of available column indices
    const availableColumns: number[] = [];
    for (let i = 0; i < gameboard.length; i++) {
      if (gameboard[i][0] === null) {
        availableColumns.push(i);
      }
    }
    return availableColumns;
  }

  randomlySelectColumnIndex(): number {
    // Get the available columns and randomly select one
    const availableColumns = ConnectFourGame.availableColumnsIndexes(this.gameBoard);
    if (availableColumns.length === 0) {
      throw new Error('No available columns to select from.');
    }
    return ConnectFourGame.selectedAvailableColumnIndexRandomly(availableColumns);
  }

  // ie update board
  addPieceToColumn(player:string, selectedColumnIndex: number) {
    const selectedRowIndex = this.findAvailableRowInColumnTopDown(selectedColumnIndex);
    if (
      selectedRowIndex >= 0
      && !this.isColumnFull(selectedColumnIndex)
      && this.checkPositionAvailability(selectedColumnIndex, selectedRowIndex)
    ) {
      this.gameBoard[selectedColumnIndex][selectedRowIndex] = player; // Place the player's piece
      return true; // Successfully added piece
    }
    return false; // Failed to add piece, column is full or position is not available
  }

  addPieceToGameBoard(player: string, nextPlayer: string) {
    const selectedColumnIndex = this.randomlySelectColumnIndex();
    this.addPieceToColumn(player, selectedColumnIndex);
    this.currentPlayer = nextPlayer; // Switch to the next player
    this.gameIsWon = this.checkForConnectedFour(player); // Check if the current player has won
    this.showGameBoard('Current GameBoard');
    if (this.gameIsWon) {
      console.log(`Player ${player} has won the game!`);
      this.showGameBoard('Final GameBoard');
    }
  }

  public findAvailableRowInColumnTopDown(selectedColumnIndex: number) {
    let lastAvailableRowIndex = -1;
    this.gameBoard[selectedColumnIndex].forEach((rowValue) => {
      if (rowValue === null) {
        lastAvailableRowIndex++; // Return the first available row index in the selected column
      }
    });
    return lastAvailableRowIndex; // Return -1 if no available row is found
  }

  public findAvailableRowInColumnBottomUp(selectedColumnIndex: number): number {
    let firstAvailableRowIndex = -1;
    for (let row = this.gameBoard[selectedColumnIndex].length - 1; row >= 0; row--) {
      if (this.gameBoard[selectedColumnIndex][row] === null) {
        firstAvailableRowIndex = row;
      }
    }
    return firstAvailableRowIndex;
  }

  isColumnFull(selectedColumnIndex: number) {
    return this.gameBoard[selectedColumnIndex][0] !== null;
  }

  isColumnAvailable(selectedColumnIndex: number) {
    return this.gameBoard[selectedColumnIndex][0] === null;
  }

  checkPositionAvailability(selectedColumnIndex:number, selectedRowIndex:number) {
    return this.gameBoard[selectedColumnIndex][selectedRowIndex] === null;
  }

  checkVerticalRowWin(player: string, selectedColumnIndex:number): boolean {
    let playerWon = false;
    let consecutiveCount = 0;
    for (let row = 0; row < this.gameBoard[selectedColumnIndex].length; row++) {
      if (this.gameBoard[selectedColumnIndex][row] === player) {
        consecutiveCount++;
        if (consecutiveCount === 4) {
          playerWon = true;
          break;
        }
      } else {
        consecutiveCount = 0; // Reset count if the sequence is broken
      }
    }
    return playerWon;
  }

  checkVerticalGameBoardWin(player: string): boolean {
    let playerWon = false;
    for (let col = 0; col < this.gameBoard.length; col++) {
      if (this.checkVerticalRowWin(player, col)) {
        playerWon = true;
        break;
      }
    }
    return playerWon;
  }

  checkHorizontalRowWin(player: string, selectedRowIndex:number): boolean {
    let playerWon = false;
    let consecutiveCount = 0;
    for (let col = 0; col < this.gameBoard.length; col++) {
      if (this.gameBoard[col][selectedRowIndex] === player) {
        consecutiveCount++;
        if (consecutiveCount === 4) {
          playerWon = true;
          break;
        }
      } else {
        consecutiveCount = 0; // Reset count if the sequence is broken
      }
    }
    return playerWon;
  }

  checkHorizontalGameBoardWin(player: string): boolean {
    let playerWon = false;
    for (let row = 0; row < this.gameBoard[0].length; row++) {
      if (this.checkHorizontalRowWin(player, row)) {
        playerWon = true;
        break;
      }
    }
    return playerWon;
  }

  checkDiagonalLeftToRightWin(player: string): boolean {
    let playerWon = false;
    // Check diagonals going from bottom-left to top-right
    for (let col = 0; col < this.gameBoard.length - 3; col++) {
      for (let row = 3; row < this.gameBoard[col].length; row++) {
        if (
          this.gameBoard[col][row] === player
          && this.gameBoard[col + 1][row - 1] === player
          && this.gameBoard[col + 2][row - 2] === player
          && this.gameBoard[col + 3][row - 3] === player
        ) {
          playerWon = true;
          break;
        }
      }
      if (playerWon) break;
    }
    return playerWon;
  }

  checkDiagonalRightToLeftWin(player: string): boolean {
    let playerWon = false;
    // Check diagonals going from bottom-right to top-left
    for (let col = 3; col < this.gameBoard.length; col++) {
      for (let row = 3; row < this.gameBoard[col].length; row++) {
        if (
          this.gameBoard[col][row] === player
          && this.gameBoard[col - 1][row - 1] === player
          && this.gameBoard[col - 2][row - 2] === player
          && this.gameBoard[col - 3][row - 3] === player
        ) {
          playerWon = true;
          break;
        }
      }
      if (playerWon) break;
    }
    return playerWon;
  }

  checkDiagonalGameBoardWin(player: string): boolean {
    // Check for diagonal connections (both directions)
    return this.checkDiagonalLeftToRightWin(player) || this.checkDiagonalRightToLeftWin(player);
  }

  checkForConnectedFour(player: string) {
    // Check horizontal, vertical, and diagonal connections for the player
    return (
      this.checkVerticalGameBoardWin(player)
      || this.checkHorizontalGameBoardWin(player)
      || this.checkDiagonalGameBoardWin(player)
    );
  }

  showGameBoard(gameState = 'Current GameBoard:') {
    // Display board rotated for proper column view
    console.log(`\n${gameState}:`);
    for (let row = 0; row < 6; row++) {
      const rowData = [];
      for (let col = 0; col < 7; col++) {
        rowData.push(this.gameBoard[col][row] || ' .');
      }
      console.log(rowData.join(' '));
    }
    console.log('\n');
  }
}

// Connect Four game - first to 4 in a row wins
function playConnectFourGame(firstPlayer = 'P1'): ConnectFourGame {
  const c4Game = new ConnectFourGame(firstPlayer);
  let turnCount = 0;
  const maxTurns = 42; // 6x7 board

  while (!c4Game.gameIsWon && turnCount < maxTurns) {
    const { currentPlayer } = c4Game;
    const nextPlayer = currentPlayer === 'P1' ? 'P2' : 'P1';
    c4Game.addPieceToGameBoard(currentPlayer, nextPlayer);
    turnCount++;
  }

  if (!c4Game.gameIsWon) {
    console.log('Game ended in a draw!');
  }

  return c4Game;
}

export { ConnectFourGame, playConnectFourGame };

export function runConnectFour(firstPlayer?: string): void {
  console.log('Running Connect Four Game');
  if (firstPlayer) {
    console.log(`First player: ${firstPlayer}`);
  }
  playConnectFourGame(firstPlayer);
}
