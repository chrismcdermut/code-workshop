# Connect Four Implementation

This directory contains **two different implementations** of Connect Four, demonstrating different programming paradigms:

## 🎯 Object-Oriented Implementation

**Directory:** `oop/`
**Files:** `connectFourOOP.ts`, `connectFourOOP.test.ts`, `runConnectFourOOP.js`

- **Class-based approach** with `ConnectFourGame` class
- **Mutable state** using `this` references
- **Traditional OOP patterns** with methods that modify object state
- **15 test cases** covering all functionality

**Run with:**
```bash
npm run connectFour:oop          # Default (P1 starts)
npm run connectFour:oop -- P2    # P2 starts first
```

## ⚡ Functional Implementation

**Directory:** `functional/`
**Files:** `connectFourFunctional.ts`, `connectFourFunctional.test.ts`, `runConnectFourFunctional.js`

- **Pure functional programming** approach
- **Immutable data structures** - functions return new state
- **No side effects** - all data comes from function parameters
- **Composable functions** that can be easily tested in isolation
- **16 test cases** covering all functionality

**Run with:**
```bash
npm run connectFour:functional          # Default (P1 starts)
npm run connectFour:functional -- P2    # P2 starts first
```

## 🎮 Game Features (Both Implementations)

- **6x7 board** (6 rows, 7 columns) - standard Connect Four size
- **Win detection:** vertical, horizontal, and diagonal (both directions)
- **Random automated gameplay** for testing and demonstration
- **Visual board display** showing current game state
- **Draw detection** when board is full with no winner
- **Configurable first player** (P1 or P2)

## 🧪 Testing

Run tests for specific implementation:
```bash
npm test challenges/connectFour/oop/connectFourOOP.test.ts        # OOP tests
npm test challenges/connectFour/functional/connectFourFunctional.test.ts # Functional tests
npm test challenges/connectFour/                                  # Both test suites
```

## 📚 Key Differences

| Aspect | Object-Oriented | Functional |
|--------|-----------------|------------|
| **State Management** | Mutable object properties | Immutable data structures |
| **Data Flow** | Methods modify `this.state` | Functions return new state |
| **Testing** | Test class methods | Test pure functions |
| **Predictability** | State can change unexpectedly | Predictable input/output |
| **Debugging** | Need to track object state | Easy to debug isolated functions |
| **Parallelization** | Harder due to shared state | Easier due to no side effects |

## 🎯 Learning Objectives

This dual implementation demonstrates:

1. **Paradigm comparison** - Same logic, different approaches
2. **Functional programming principles** - Immutability, pure functions, no side effects
3. **Object-oriented patterns** - Encapsulation, state management, method organization
4. **Testing strategies** - How testing differs between paradigms
5. **Code organization** - Structure and maintainability in each approach

Both implementations follow the same game rules and produce identical gameplay experiences, but showcase fundamentally different programming philosophies.