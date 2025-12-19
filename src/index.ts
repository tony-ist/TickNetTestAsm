import * as ohm from 'ohm-js';
import * as fs from 'fs';
import * as path from 'path';
import simpleTns from './programs/simple.tns?raw';

const grammarSource = fs.readFileSync(
  path.join(__dirname, '..', 'src', 'grammar.ohm'),
  'utf-8'
);
const grammar = ohm.grammar(grammarSource);

const simpleProgram = grammar.trace(simpleTns);
console.log(simpleProgram);
