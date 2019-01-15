const opcodes = require('./opcodes');
const { parseInput, splitSample, checkAgainst } = require('./utils');

module.exports = function (lines) {
  const opcodeKeys = initializeOpcodeOptions();
  const { samples, programInstructions } = parseInput(lines);

  // rule out mappings based on the samples
  samples.forEach(rawSample => {
    const { sample, id } = splitSample(rawSample);
    for (opcode of Object.keys(opcodes)) {
      if (!checkAgainst(opcode, sample)) {
        opcodeKeys[opcode] = opcodeKeys[opcode].filter(key => key != id);
      }
    }
  });

  let initialMapping = Object.entries(opcodeKeys);
  const finalKeys = [];

  // iteratively rule out mappings based on opcodes already definitively mapped to another id
  for (let i = 0; i < 16; i++) {
    const resolvedMapping = initialMapping.find(mapping => mapping[1].length === 1);
    const resolvedId = resolvedMapping[1][0];
    finalKeys[resolvedId] = resolvedMapping[0];
    for (item of initialMapping) {
      item[1] = item[1].filter(id => id != resolvedId);
    }
  }

  // apply decoded opcodes to program instructions
  const register = [0, 0, 0, 0];
  for (programInstruction of programInstructions) {
    const [id, ...instructions] = programInstruction;
    opcodes[finalKeys[id]](register, instructions);
  }
  return register[0];
}


function initializeOpcodeOptions() {
  const opcodeIds = {};
  for (opcode of Object.keys(opcodes)) {
    opcodeIds[opcode] = Array.from({ length: 16 }, (v, i) => i);
  }
  return opcodeIds;
}

// execute the test program
// return the value in register 0