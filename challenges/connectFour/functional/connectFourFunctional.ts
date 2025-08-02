// Pure functional Connect Four implementation

export type Player = 'P1' | 'P2';
export type Cell = Player | null;
export type Board = Cell[][];
export type GameState = {
  board: Board;
  currentPlayer: Player;
  isWon: boolean;
  winner: Player | null;
};

// Pure function to create initial board
export function createBoard(): Board {
  return [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
  ];
}

// Pure function to create initial game state
export function createGameState(firstPlayer: Player = 'P1'): GameState {
  return {
    board: createBoard(),
    currentPlayer: firstPlayer,
    isWon: false,
    winner: null,
  };
}

// Pure function to get available columns
export function getAvailableColumns(board: Board): number[] {
  return board
    .map((column, index) => (column[0] === null ? index : -1))
    .filter((index) => index !== -1);
}

// Pure function to get random column from available
export function selectRandomColumn(availableColumns: number[]): number {
  if (availableColumns.length === 0) {
    throw new Error('No available columns');
  }
  const randomIndex = Math.floor(Math.random() * availableColumns.length);
  return availableColumns[randomIndex];
}

// Pure function to find available row in column
export function findAvailableRowTopDown(board: Board, columnIndex: number): number {
  const column = board[columnIndex];
  for (let row = column.length - 1; row >= 0; row--) {
    if (column[row] === null) {
      return row;
    }
  }
  return -1;
}

// Pure function to find available row in column
export function findAvailableRowBottomUp(board: Board, columnIndex: number): number {
  const column = board[columnIndex];
  let firstAvailableRowIndex = -1;
  for (let row = column.length - 1; row >= 0; row--) {
    if (column[row] === null) {
      firstAvailableRowIndex = row;
    }
  }
  return firstAvailableRowIndex;
}

// Pure function to place piece on board (returns new board)
export function placePiece(board: Board, columnIndex: number, player: Player): Board {
  const newBoard = board.map((col) => [...col]); // Deep copy
  const rowIndex = findAvailableRowTopDown(board, columnIndex);

  if (rowIndex !== -1) {
    newBoard[columnIndex][rowIndex] = player;
  }

  return newBoard;
}

// Pure function to check vertical win
export function checkVerticalWin(board: Board, player: Player): boolean {
  for (let col = 0; col < board.length; col++) {
    let consecutiveCount = 0;
    for (let row = 0; row < board[col].length; row++) {
      if (board[col][row] === player) {
        consecutiveCount++;
        if (consecutiveCount === 4) return true;
      } else {
        consecutiveCount = 0;
      }
    }
  }
  return false;
}

// Pure function to check horizontal win
export function checkHorizontalWin(board: Board, player: Player): boolean {
  for (let row = 0; row < 6; row++) {
    let consecutiveCount = 0;
    for (let col = 0; col < board.length; col++) {
      if (board[col][row] === player) {
        consecutiveCount++;
        if (consecutiveCount === 4) return true;
      } else {
        consecutiveCount = 0;
      }
    }
  }
  return false;
}

// Pure function to check diagonal win (bottom-left to top-right)
export function checkDiagonalLeftToRight(board: Board, player: Player): boolean {
  for (let col = 0; col <= 3; col++) {
    for (let row = 3; row < 6; row++) {
      if (board[col][row] === player
          && board[col + 1][row - 1] === player
          && board[col + 2][row - 2] === player
          && board[col + 3][row - 3] === player) {
        return true;
      }
    }
  }
  return false;
}

// Pure function to check diagonal win (bottom-right to top-left)
export function checkDiagonalRightToLeft(board: Board, player: Player): boolean {
  for (let col = 3; col < 7; col++) {
    for (let row = 3; row < 6; row++) {
      if (board[col][row] === player
          && board[col - 1][row - 1] === player
          && board[col - 2][row - 2] === player
          && board[col - 3][row - 3] === player) {
        return true;
      }
    }
  }
  return false;
}

// Pure function to check if player won
export function checkWin(board: Board, player: Player): boolean {
  return checkVerticalWin(board, player)
         || checkHorizontalWin(board, player)
         || checkDiagonalLeftToRight(board, player)
         || checkDiagonalRightToLeft(board, player);
}

// Pure function to get next player
export function getNextPlayer(currentPlayer: Player): Player {
  return currentPlayer === 'P1' ? 'P2' : 'P1';
}

// Pure function to make a move (returns new game state)
export function makeMove(gameState: GameState, columnIndex: number): GameState {
  if (gameState.isWon) {
    return gameState; // Game already won, no changes
  }

  const newBoard = placePiece(gameState.board, columnIndex, gameState.currentPlayer);
  const hasWon = checkWin(newBoard, gameState.currentPlayer);

  return {
    board: newBoard,
    currentPlayer: hasWon ? gameState.currentPlayer : getNextPlayer(gameState.currentPlayer),
    isWon: hasWon,
    winner: hasWon ? gameState.currentPlayer : null,
  };
}

// Pure function to make random move
export function makeRandomMove(gameState: GameState): GameState {
  const availableColumns = getAvailableColumns(gameState.board);
  if (availableColumns.length === 0 || gameState.isWon) {
    return gameState;
  }

  const selectedColumn = selectRandomColumn(availableColumns);
  return makeMove(gameState, selectedColumn);
}

// Pure function to check if board is full
export function isBoardFull(board: Board): boolean {
  return getAvailableColumns(board).length === 0;
}

// Pure function to display board
export function boardToString(board: Board): string {
  const lines: string[] = [];
  for (let row = 0; row < 6; row++) {
    const rowData: string[] = [];
    for (let col = 0; col < 7; col++) {
      rowData.push(board[col][row] || ' .');
    }
    lines.push(rowData.join(' '));
  }
  return lines.join('\n');
}

// Pure function to play a complete game (returns final state)
export function playGame(initialState: GameState = createGameState()): GameState {
  let state = initialState;

  while (!state.isWon && !isBoardFull(state.board)) {
    state = makeRandomMove(state);
  }

  return state;
}

// Function to run and display game (side effects isolated here)
export function runFunctionalConnectFour(firstPlayer?: Player): void {
  console.log('Running Functional Connect Four Game');
  if (firstPlayer) {
    console.log(`First player: ${firstPlayer}`);
  }

  let state = createGameState(firstPlayer);

  while (!state.isWon && !isBoardFull(state.board)) {
    state = makeRandomMove(state);
    console.log('\nCurrent Board:');
    console.log(boardToString(state.board));
    console.log('');
  }

  if (state.isWon) {
    console.log(`Player ${state.winner} has won the game!`);
  } else {
    console.log('Game ended in a draw!');
  }
}
