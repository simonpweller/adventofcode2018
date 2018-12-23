module.exports = function(lines) {
  let instructions = parseLines(lines);
  let out = '';
  while(instructions.length) {
    const step = nextStep(instructions);
    out += step;
    instructions = updateInstructionsAfterStep(instructions, step);
  }
  return out;
}

module.exports.nextStep = nextStep;
module.exports.parseLines = parseLines;

function nextStep(instructions) {
  const stepWithoutPrerequisites = instructions.find(instruction => instruction.prerequisites.size === 0).step; 
  return stepWithoutPrerequisites;
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

function updateInstructionsAfterStep(instructions, step) {
  instructions = instructions.filter(instruction => instruction.step !== step);
  return instructions.map(instruction => {
    instruction.prerequisites.delete(step);
    return instruction;
  });
}