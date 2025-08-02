import {
  createBoard,
  createGameState,
  getAvailableColumns,
  placePiece,
  checkVerticalWin,
  checkHorizontalWin,
  checkDiagonalLeftToRight,
  makeMove,
  isBoardFull,
  boardToString,
  playGame,
  runFunctionalConnectFour,
} from './connectFourFunctional';

describe('Functional Connect Four', () => {
  describe('createBoard', () => {
    test('should create empty 6x7 board', () => {
      const board = createBoard();
      expect(board.length).toBe(7); // 7 columns
      expect(board[0].length).toBe(6); // 6 rows
      expect(board.every(col => col.every(cell => cell === null))).toBe(true);
    });
  });

  describe('createGameState', () => {
    test('should create initial game state with P1', () => {
      const state = createGameState();
      expect(state.currentPlayer).toBe('P1');
      expect(state.isWon).toBe(false);
      expect(state.winner).toBe(null);
    });

    test('should create initial game state with custom first player', () => {
      const state = createGameState('P2');
      expect(state.currentPlayer).toBe('P2');
    });
  });

  describe('getAvailableColumns', () => {
    test('should return all columns for empty board', () => {
      const board = createBoard();
      expect(getAvailableColumns(board)).toEqual([0, 1, 2, 3, 4, 5, 6]);
    });

    test('should exclude full columns', () => {
      const board = createBoard();
      // Fill column 0
      for (let i = 0; i < 6; i++) {
        board[0][i] = 'P1';
      }
      expect(getAvailableColumns(board)).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('placePiece', () => {
    test('should place piece at bottom of empty column', () => {
      const board = createBoard();
      const newBoard = placePiece(board, 0, 'P1');

      expect(newBoard[0][5]).toBe('P1'); // Bottom row
      expect(board[0][5]).toBe(null); // Original board unchanged
    });

    test('should stack pieces', () => {
      let board = createBoard();
      board = placePiece(board, 0, 'P1');
      board = placePiece(board, 0, 'P2');
      board = placePiece(board, 0, 'P1');

      expect(board[0][5]).toBe('P1');
      expect(board[0][4]).toBe('P2');
      expect(board[0][3]).toBe('P1');
    });
  });

  describe('Win checking functions', () => {
    test('checkVerticalWin should detect 4 in a column', () => {
      let board = createBoard();
      for (let i = 0; i < 4; i++) {
        board = placePiece(board, 0, 'P1');
      }
      expect(checkVerticalWin(board, 'P1')).toBe(true);
      expect(checkVerticalWin(board, 'P2')).toBe(false);
    });

    test('checkHorizontalWin should detect 4 in a row', () => {
      let board = createBoard();
      for (let col = 0; col < 4; col++) {
        board = placePiece(board, col, 'P1');
      }
      expect(checkHorizontalWin(board, 'P1')).toBe(true);
      expect(checkHorizontalWin(board, 'P2')).toBe(false);
    });

    test('checkDiagonalLeftToRight should detect diagonal win', () => {
      let board = createBoard();
      // Create diagonal: (0,5), (1,4), (2,3), (3,2)
      board = placePiece(board, 0, 'P1'); // (0,5)
      board = placePiece(board, 1, 'P2'); // (1,5)
      board = placePiece(board, 1, 'P1'); // (1,4)
      board = placePiece(board, 2, 'P2'); // (2,5)
      board = placePiece(board, 2, 'P2'); // (2,4)
      board = placePiece(board, 2, 'P1'); // (2,3)
      board = placePiece(board, 3, 'P2'); // (3,5)
      board = placePiece(board, 3, 'P2'); // (3,4)
      board = placePiece(board, 3, 'P2'); // (3,3)
      board = placePiece(board, 3, 'P1'); // (3,2)

      expect(checkDiagonalLeftToRight(board, 'P1')).toBe(true);
    });
  });

  describe('makeMove', () => {
    test('should update game state with move', () => {
      const initialState = createGameState();
      const newState = makeMove(initialState, 0);

      expect(newState.board[0][5]).toBe('P1');
      expect(newState.currentPlayer).toBe('P2');
      expect(newState.isWon).toBe(false);

      // Original state unchanged
      expect(initialState.board[0][5]).toBe(null);
      expect(initialState.currentPlayer).toBe('P1');
    });

    test('should detect win and update state', () => {
      let state = createGameState();
      // Create winning condition
      for (let i = 0; i < 3; i++) {
        state = makeMove(state, 0); // P1
        state = makeMove(state, 1); // P2
      }
      state = makeMove(state, 0); // P1 wins

      expect(state.isWon).toBe(true);
      expect(state.winner).toBe('P1');
    });
  });

  describe('isBoardFull', () => {
    test('should return false for empty board', () => {
      const board = createBoard();
      expect(isBoardFull(board)).toBe(false);
    });

    test('should return true for full board', () => {
      const board = createBoard();
      // Fill entire board
      for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 6; row++) {
          board[col][row] = row % 2 === 0 ? 'P1' : 'P2';
        }
      }
      expect(isBoardFull(board)).toBe(true);
    });
  });

  describe('boardToString', () => {
    test('should convert empty board to string', () => {
      const board = createBoard();
      const str = boardToString(board);
      expect(str.split('\n').length).toBe(6); // 6 rows
      expect(str).toContain(' .');
    });
  });

  describe('playGame', () => {
    test('should play complete game and return final state', () => {
      const finalState = playGame();
      expect(finalState.isWon || isBoardFull(finalState.board)).toBe(true);
    });
  });

  describe('runFunctionalConnectFour', () => {
    test('should run without errors', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      expect(() => runFunctionalConnectFour()).not.toThrow();

      consoleSpy.mockRestore();
    });
  });
});
