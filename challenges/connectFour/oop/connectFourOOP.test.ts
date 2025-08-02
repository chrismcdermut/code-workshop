import { ConnectFourGame, playConnectFourGame, runConnectFour } from './connectFourOOP';

describe('ConnectFour Test', () => {
  describe('ConnectFourGame Class', () => {
    test('should initialize with empty 6x7 board', () => {
      const game = new ConnectFourGame();
      expect(game.gameBoard.length).toBe(7); // 7 columns
      expect(game.gameBoard[0].length).toBe(6); // 6 rows
      expect(game.gameBoard.every(col => col.every(cell => cell === null))).toBe(true);
      expect(game.gameIsWon).toBe(false);
      expect(game.currentPlayer).toBe('P1');
    });

    test('should initialize with custom first player', () => {
      const game = new ConnectFourGame('P2');
      expect(game.currentPlayer).toBe('P2');
    });

    test('should detect available columns', () => {
      const game = new ConnectFourGame();
      const available = ConnectFourGame.availableColumnsIndexes(game.gameBoard);
      expect(available).toEqual([0, 1, 2, 3, 4, 5, 6]);
    });

    test('should add piece to column', () => {
      const game = new ConnectFourGame();
      const added = game.addPieceToColumn('P1', 0);
      expect(added).toBe(true);
      expect(game.gameBoard[0][5]).toBe('P1'); // Bottom of column
    });

    test('should fill column from bottom up', () => {
      const game = new ConnectFourGame();
      game.addPieceToColumn('P1', 0);
      game.addPieceToColumn('P2', 0);
      game.addPieceToColumn('P1', 0);

      expect(game.gameBoard[0][5]).toBe('P1');
      expect(game.gameBoard[0][4]).toBe('P2');
      expect(game.gameBoard[0][3]).toBe('P1');
    });

    test('should detect full column', () => {
      const game = new ConnectFourGame();
      // Fill column 0
      for (let i = 0; i < 6; i++) {
        game.addPieceToColumn('P1', 0);
      }
      expect(game.isColumnFull(0)).toBe(true);
      expect(game.isColumnAvailable(0)).toBe(false);
    });

    test('should detect vertical win', () => {
      const game = new ConnectFourGame();
      // Create vertical win for P1 in column 0
      for (let i = 0; i < 4; i++) {
        game.addPieceToColumn('P1', 0);
      }
      expect(game.checkVerticalGameBoardWin('P1')).toBe(true);
      expect(game.checkForConnectedFour('P1')).toBe(true);
    });

    test('should detect horizontal win', () => {
      const game = new ConnectFourGame();
      // Create horizontal win for P1 in bottom row
      for (let col = 0; col < 4; col++) {
        game.addPieceToColumn('P1', col);
      }
      expect(game.checkHorizontalGameBoardWin('P1')).toBe(true);
      expect(game.checkForConnectedFour('P1')).toBe(true);
    });

    test('should detect diagonal win (left to right)', () => {
      const game = new ConnectFourGame();
      // Create diagonal win for P1 from bottom-left to top-right
      // P1 pieces at: (0,5), (1,4), (2,3), (3,2)
      game.addPieceToColumn('P1', 0); // (0,5) - bottom of col 0
      game.addPieceToColumn('P2', 1); // (1,5) - bottom of col 1
      game.addPieceToColumn('P1', 1); // (1,4) - second in col 1
      game.addPieceToColumn('P2', 2); // (2,5) - bottom of col 2
      game.addPieceToColumn('P2', 2); // (2,4) - second in col 2
      game.addPieceToColumn('P1', 2); // (2,3) - third in col 2
      game.addPieceToColumn('P2', 3); // (3,5) - bottom of col 3
      game.addPieceToColumn('P2', 3); // (3,4) - second in col 3
      game.addPieceToColumn('P2', 3); // (3,3) - third in col 3
      game.addPieceToColumn('P1', 3); // (3,2) - fourth in col 3

      // Verify the pieces are in the right positions
      expect(game.gameBoard[0][5]).toBe('P1');
      expect(game.gameBoard[1][4]).toBe('P1');
      expect(game.gameBoard[2][3]).toBe('P1');
      expect(game.gameBoard[3][2]).toBe('P1');

      expect(game.checkDiagonalLeftToRightWin('P1')).toBe(true);
      expect(game.checkForConnectedFour('P1')).toBe(true);
    });

    test('should detect diagonal win (right to left)', () => {
      const game = new ConnectFourGame();
      // Create diagonal win for P1
      game.addPieceToColumn('P1', 5); // (5,5)
      game.addPieceToColumn('P2', 4); // (4,5)
      game.addPieceToColumn('P1', 4); // (4,4)
      game.addPieceToColumn('P2', 3); // (3,5)
      game.addPieceToColumn('P2', 3); // (3,4)
      game.addPieceToColumn('P1', 3); // (3,3)
      game.addPieceToColumn('P2', 2); // (2,5)
      game.addPieceToColumn('P2', 2); // (2,4)
      game.addPieceToColumn('P2', 2); // (2,3)
      game.addPieceToColumn('P1', 2); // (2,2)

      expect(game.checkDiagonalRightToLeftWin('P1')).toBe(true);
      expect(game.checkForConnectedFour('P1')).toBe(true);
    });

    test('should handle no win scenario', () => {
      const game = new ConnectFourGame();
      game.addPieceToColumn('P1', 0);
      game.addPieceToColumn('P2', 1);
      game.addPieceToColumn('P1', 2);

      expect(game.checkForConnectedFour('P1')).toBe(false);
      expect(game.checkForConnectedFour('P2')).toBe(false);
    });
  });

  describe('playConnectFourGame function', () => {
    test('should play a complete game', () => {
      const game = playConnectFourGame();
      expect(game).toBeInstanceOf(ConnectFourGame);
      // Game should either have a winner or be a draw (board full)
      const hasWinner = game.gameIsWon;
      const boardFull = ConnectFourGame.availableColumnsIndexes(game.gameBoard).length === 0;
      expect(hasWinner || boardFull).toBe(true);
    });

    test('should play a game with custom first player', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const game = playConnectFourGame('P2');
      expect(game).toBeInstanceOf(ConnectFourGame);
      consoleSpy.mockRestore();
    });
  });

  describe('runConnectFour function', () => {
    test('should run without errors', () => {
      // Mock console.log to avoid output during tests
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      expect(() => runConnectFour()).not.toThrow();

      consoleSpy.mockRestore();
    });
  });
});
