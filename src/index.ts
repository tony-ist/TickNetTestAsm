import * as ohm from 'ohm-js';
import * as fs from 'fs';
import * as path from 'path';

// Load the grammar from the .ohm file
const grammarSource = fs.readFileSync(
  path.join(__dirname, '..', 'src', 'grammar.ohm'),
  'utf-8'
);
const grammar = ohm.grammar(grammarSource);

// Example usage
const examples = [
  '2 + 3',
  '10 - 5',
  '4 * 6',
  '20 / 4',
  '(2 + 3) * 4',
  '10 + 20 - 5',
];

console.log('Parsing arithmetic expressions:\n');

examples.forEach((expr) => {
  const match = grammar.match(expr);
  if (match.succeeded()) {
    console.log(`✓ "${expr}" - Valid expression`);
  } else {
    console.log(`✗ "${expr}" - Invalid expression`);
    console.log(`  Error: ${match.message}`);
  }
});

// Demonstrate semantic actions (optional)
console.log('\n--- Semantic Evaluation Example ---\n');

const semantics = grammar.createSemantics().addOperation('eval', {
  AddExpr_plus(left, _op, right) {
    return left.eval() + right.eval();
  },
  AddExpr_minus(left, _op, right) {
    return left.eval() - right.eval();
  },
  MulExpr_times(left, _op, right) {
    return left.eval() * right.eval();
  },
  MulExpr_divide(left, _op, right) {
    return left.eval() / right.eval();
  },
  PrimaryExpr_parens(_open, expr, _close) {
    return expr.eval();
  },
  number(_digits) {
    return parseInt(this.sourceString, 10);
  },
});

examples.forEach((expr) => {
  const match = grammar.match(expr);
  if (match.succeeded()) {
    const result = semantics(match).eval();
    console.log(`${expr} = ${result}`);
  }
});

