const { analyseLogs, mostAsleepMinute } = require('./solve1');

module.exports = function(lines) {
  const shifts = analyseLogs(lines);
  const guards = Array.from(new Set(shifts.map(shift => shift.guard)));

  const mostAsleepByGuard = {};
  for (const guard of guards) {
    mostAsleepByGuard[guard] = mostAsleepMinute(shifts.filter(shift => shift.guard === guard));
  }

  const mostTimesAsleep = Math.max(...Object.values(mostAsleepByGuard).map(mostAsleep => mostAsleep.times));
  const entryForGuard = Object.entries(mostAsleepByGuard).find(entry => entry[1].times === mostTimesAsleep);
  const guard = Number(entryForGuard[0]);
  const minute = Number(entryForGuard[1].minute) 

  return {
    guard,
    minute,
  }
}