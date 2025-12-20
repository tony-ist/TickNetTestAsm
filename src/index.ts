import * as ohm from 'ohm-js';
import * as fs from 'fs';
import * as path from 'path';

const grammarSource = fs.readFileSync(
  path.join(__dirname, '..', 'src', 'grammar.ohm'),
  'utf-8'
);
const grammar = ohm.grammar(grammarSource);

const simpleTns = fs.readFileSync(
  path.join(__dirname, 'programs', 'simple.tns'),
  'utf-8'
);

const semantics = grammar.createSemantics();

semantics.addOperation('assemble', {
  program: programLines => programLines.assemble(),
  programLine: programLine => programLine.assemble(),
  instructionLine: (_inlineSpace1, instruction, _inlineSpace2, _inlineComment, _newline) => instruction.assemble(),
  instruction: (mnemonic, _space1, port, _space2, data) => {
    const checkBit = mnemonic.sourceString === 'check' ? 1 : 0;
    const portInt = parseInt(port.sourceString);
    const dataInt = parseInt(data.sourceString);
    return checkBit + (portInt << 1) + (dataInt << 3);
  },
  _iter: (...children) => children.map(c => c.assemble()).filter(x => x !== null),
});

const matchResult = grammar.match(simpleTns);

if (matchResult.failed()) {
  console.error(matchResult.message);
  process.exit(1);
}

const assembled = semantics(matchResult).assemble();
console.log(assembled);
console.log(assembled.map((x: number) => x.toString(2)).join(' '));