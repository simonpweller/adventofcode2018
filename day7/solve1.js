module.exports = function(lines) {
  let instructions = parseLines(lines);
  let out = '';
  while(instructions.length) {
    const step = nextStep(instructions);
    out += step;
    instructions = removeInstruction(instructions, step);
    instructions = unblockInstruction(instructions, step);
  }
  return out;
}

module.exports.nextStep = nextStep;
module.exports.parseLines = parseLines;
module.exports.removeInstruction = removeInstruction;
module.exports.unblockInstruction = unblockInstruction;

function nextStep(instructions) {
  const availableInstruction = instructions.find(instruction => instruction.prerequisites.size === 0); 
  return availableInstruction ? availableInstruction.step : null;
}

function parseLines(lines) {
  const instructions = [];
  lines.forEach(line => {
    const [match, prerequisite, step] = line.match(/Step (.) must be finished before step (.) can begin\./);
    if (!instructions.find(item => item.step === step)) instructions.push({step, prerequisites: new Set()});
    if (!instructions.find(item => item.step === prerequisite)) instructions.push({step: prerequisite, prerequisites: new Set()});
    instructions.find(item => item.step === step).prerequisites.add(prerequisite);
  });
  return sortByStep(instructions);
}

function sortByStep(instructions) {
  instructions.sort((a, b) => {
    if (a.step > b.step) {
        return 1;
      }
      if (a.step < b.step) {
        return -1;
      }
      return 0;
    }
  );
  return instructions;
}

function removeInstruction(instructions, step) {
  return instructions.filter(instruction => instruction.step !== step);
}

function unblockInstruction(instructions, step) {
  return instructions.map(instruction => {
    instruction.prerequisites.delete(step);
    return instruction;
  });
}