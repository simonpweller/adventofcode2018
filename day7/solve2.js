const {parseLines, nextStep, removeInstruction, unblockInstruction} = require('./solve1');

module.exports = function(lines, numWorkers = 5, baseTime = 60) {
  let instructions = parseLines(lines);
  let tasksInProgress = [];
  let seconds = 0;
  while(true) {
    // check if workers and / or tasks can be freed up
    tasksInProgress = tasksInProgress.map(task => {
      task.timeLeft--;
      if(task.timeLeft === 0) {
        instructions = unblockInstruction(instructions, task.step);
      }
      return task;
    }).filter(task => task.timeLeft > 0);

    // while workers and tasks are available, start new tasks
    while(tasksInProgress.length < numWorkers && nextStep(instructions)) {
      const step = nextStep(instructions);
      tasksInProgress.push({
        step,
        timeLeft: baseTime + step.charCodeAt(0) - 64,
      });
      instructions = removeInstruction(instructions, step);
    }

    // if all tasks are completed - break
    if(tasksInProgress.length === 0 && instructions.length === 0) {
      break;
    }

    // otherwise, increment seconds
    seconds++;
  }
  return seconds;
}