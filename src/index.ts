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

const HALT_INSTRUCTION = 0b0000_0000_1110;
const NOP_INSTRUCTION = 0b0000_0001_1110;

const semantics = grammar.createSemantics();

semantics.addOperation('assemble', {
  program: programLines => programLines.assemble(),
  programLine: programLine => programLine.assemble(),
  instructionLine: (_inlineSpace1, instruction, _inlineSpace2, _inlineComment, _newline) => instruction.assemble(),
  instruction: (mnemonic, _space1, port, _space2, data) => {
    if (mnemonic.sourceString === 'halt') {
      return HALT_INSTRUCTION;
    }

    if (mnemonic.sourceString === 'nop') {
      return NOP_INSTRUCTION;
    }

    const checkBit = mnemonic.sourceString === 'check' ? 1 : 0;
    const portInt = parseInt(port.children[0].sourceString);
    const dataInt = parseInt(data.children[0].sourceString);

    return checkBit + (portInt << 1) + (dataInt << 4);
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
console.log(assembled.map((x: number) => padWithZeros(x.toString(2), 12)).join('\n'));
console.log(assembled.map((x: number) => padWithZeros(x.toString(16).toUpperCase(), 3)).join(' '));

function padWithZeros(value: string, length: number) {
  return value.padStart(length, '0');
}