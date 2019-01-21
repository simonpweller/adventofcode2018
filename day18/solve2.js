const { parseInput, transitionMap } = require('./utils');

module.exports = function (lines) {
  let map = parseInput(lines);

  const maps = {};

  for (let i = 1; true; i++) {
    map = transitionMap(map);
    if (maps[map.join('')]) {
      const firstI = maps[map.join('')];
      const loopLength = i - firstI;
      const additionalIterations = (1000000000 - firstI) % loopLength;

      for (let j = 0; j < additionalIterations; j++) {
        map = transitionMap(map);
      }

      const wooded = map.reduce((total, row) => {
        return total += row.reduce((rowTotal, cell) => rowTotal += Number(cell === '|'), 0)
      }, 0);

      const lumber = map.reduce((total, row) => {
        return total += row.reduce((rowTotal, cell) => rowTotal += Number(cell === '#'), 0)
      }, 0);

      return wooded * lumber;
    } else {
      maps[map.join('')] = i;
    }
  }
}