const opcodes = require('./opcodes');

function checkAgainst(opcode, sample) {
  return JSON.stringify(opcodes[opcode]([...sample.before], [...sample.instructions])) === JSON.stringify(sample.after);
}

function numberOfMatchingOpcodes(sample) {
  return Object.keys(opcodes).reduce((count, opcode) => {
    return count += Number(checkAgainst(opcode, sample));
  }, 0);
}

module.exports = {
  ...opcodes,
  checkAgainst,
  numberOfMatchingOpcodes,
}