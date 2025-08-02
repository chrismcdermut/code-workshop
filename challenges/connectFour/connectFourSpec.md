# Connect Four Specification

## Problem Description
Implement a Connect Four game where two players take turns dropping pieces into a 6x7 grid (6 rows, 7 columns). The first player to connect four pieces in a row (horizontally, vertically, or diagonally) wins the game.

## Input
- The game is played on a 6x7 grid (6 rows, 7 columns)
- Two players: 'P1' and 'P2'
- Players alternate turns
- Pieces are dropped from the top and fall to the lowest available position in a column

## Output
- Game state after each move
- Winner announcement when a player connects four
- Draw announcement if the board fills without a winner

## Game Rules
1. Players take turns dropping pieces into columns
2. Pieces fall to the lowest available position in the selected column
3. A player wins by connecting four of their pieces in a row:
   - Horizontally
   - Vertically
   - Diagonally (both directions)
4. The game ends when:
   - A player achieves four in a row
   - The board is completely filled (draw)

## Examples
```typescript
Example 1: Vertical Win
Board State:
. . . . . .
. . . . . .
. . . . . .
P1 . . . . .
P1 . . . . .
P1 . . . . .

After P1 plays column 0:
Winner: P1 (vertical connection)

Example 2: Horizontal Win
Board State:
. . . . . .
. . . . . .
. . . . . .
. . . . . .
. . . . . .
P1 P1 P1 . . .

After P1 plays column 3:
Winner: P1 (horizontal connection)

Example 3: Diagonal Win
Board State:
. . . . . .
. . . . . .
. . . P1 . .
. . P1 P2 . .
. P1 P2 P2 . .
P1 P2 P1 P2 . .

Winner: P1 (diagonal connection)
```

## Implementation Requirements

### Two Implementation Approaches Available:

#### 1. Object-Oriented Implementation (`connectFour.ts`)
- Implement a ConnectFourGame class with:
  - Board initialization
  - Move validation
  - Piece placement
  - Win detection for all directions
  - Game state management
- Uses `this` references and mutable state
- Traditional class-based approach

#### 2. Functional Implementation (`connectFourFunctional.ts`)
- Pure functional programming approach
- Immutable data structures
- All functions receive data through parameters
- No `this` references or mutable state
- Returns new state instead of modifying existing state
- Composable pure functions

Both implementations:
- Support random moves for automated play
- Provide visual board display functionality
- Follow the same game rules and logic

## Edge Cases
- Full column (cannot place piece)
- Board completely filled (draw)
- Multiple winning combinations simultaneously
- Invalid column selection

## Testing Requirements
- Test board initialization
- Test piece placement mechanics
- Test win detection for all win types
- Test draw scenarios
- Test game flow from start to finish