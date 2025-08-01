# Code Workshop - AI Assistant Guidelines

## Project Overview
This is a comprehensive code practice repository with 80+ challenges, data structures, and algorithms. The project is currently migrating to TypeScript.

## Important Guidelines

### TypeScript First
- **Always create new files in TypeScript (.ts)** unless there's a specific reason not to
- When modifying existing JavaScript files, consider converting them to TypeScript
- Entry point files (like CLI wrappers) may remain as .js for simplicity

### Code Style
- Follow existing patterns in the codebase
- Use the existing ESLint and TypeScript configurations
- Maintain the current test coverage standards

### File Generation
- Use `npm run generate` to create new challenges/algorithms/data structures
- This creates TypeScript files with proper boilerplate

### Testing
- All code must have corresponding tests
- Run `npm test` before committing changes
- Maintain or improve the current test coverage (87.84%)

### Common Commands
- `npm run generate` - Create new boilerplate
- `npm test` - Run all tests
- `npm run lint` - Check code style
- `npm run typecheck` - Check TypeScript types (if available)

## Project Structure
- `/algorithms` - Algorithm implementations
- `/challenges` - Coding challenges
- `/dataStructures` - Data structure implementations
- `/concepts` - JavaScript/programming concepts
- `/helpers` - Utility functions
