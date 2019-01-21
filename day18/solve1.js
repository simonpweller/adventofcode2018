const { parseInput, transitionMap } = require('./utils');

module.exports = function (lines) {
  let map = parseInput(lines);
  for (let i = 0; i < 999; i++) {
    map = transitionMap(map);
  }

  const wooded = map.reduce((total, row) => {
    return total += row.reduce((rowTotal, cell) => rowTotal += Number(cell === '|'), 0)
  }, 0);

  const lumber = map.reduce((total, row) => {
    return total += row.reduce((rowTotal, cell) => rowTotal += Number(cell === '#'), 0)
  }, 0);

  return wooded * lumber;
}