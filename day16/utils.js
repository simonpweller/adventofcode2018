const opcodes = require('./opcodes');

function checkAgainst(opcode, sample) {
  return JSON.stringify(opcodes[opcode]([...sample.before], [...sample.instructions])) === JSON.stringify(sample.after);
}

function numberOfMatchingOpcodes(sample) {
  return Object.keys(opcodes).reduce((count, opcode) => {
    return count += Number(checkAgainst(opcode, sample));
  }, 0);
}

function parseInput(lines) {
  let sample = {};
  const samples = [];
  const regExp = new RegExp('(\\d+),? (\\d+),? (\\d+),? (\\d+)');

  for (const line of lines) {
    if (!line.trim().length) {
      if (Object.keys(sample).length === 0) return samples;
      samples.push(sample);
      sample = {};
      continue;
    }

    const array = line.match(regExp).slice(1, 5).map(parseFloat);
    if (line.startsWith('Before')) {
      sample.before = array;
    } else if (line.startsWith('After')) {
      sample.after = array;
    } else {
      sample.instructions = array;
    }
  }
  return samples;
}

module.exports = {
  ...opcodes,
  checkAgainst,
  numberOfMatchingOpcodes,
  parseInput,
}