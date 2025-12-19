# TypeScript Ohm-js Project

A TypeScript project demonstrating the use of [Ohm-js](https://github.com/harc/ohm) for parsing and interpreting arithmetic expressions.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Run the example:
```bash
npm start
```

Or use the dev command to build and run in one step:
```bash
npm run dev
```

## Project Structure

```
.
├── src/
│   ├── grammar.ohm    # Ohm grammar definition for arithmetic expressions
│   └── index.ts       # Main TypeScript file demonstrating grammar usage
├── dist/              # Compiled JavaScript (generated)
├── tsconfig.json      # TypeScript configuration
└── package.json       # Project dependencies and scripts
```

## Grammar

The grammar (`src/grammar.ohm`) defines a simple arithmetic expression language supporting:
- Addition and subtraction
- Multiplication and division
- Parentheses for grouping
- Integer numbers

## Example Usage

The `index.ts` file demonstrates:
1. Loading the grammar from the `.ohm` file
2. Parsing various arithmetic expressions
3. Creating semantic actions to evaluate expressions

Example expressions:
- `2 + 3`
- `10 - 5`
- `4 * 6`
- `20 / 4`
- `(2 + 3) * 4`
- `10 + 20 - 5`

## Dependencies

- **ohm-js**: Latest version for parsing with Ohm grammars
- **typescript**: TypeScript compiler
- **@types/node**: Type definitions for Node.js

