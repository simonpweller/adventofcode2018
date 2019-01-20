const { simulate, getRanges } = require('./utils');

module.exports = function (lines) {
  const simulationResult = simulate(lines);

  const yMin = simulationResult.findIndex(row => row.includes('#'));
  const countableResult = simulationResult.slice(yMin);

  const res = countableResult.reduce((total, row) => {
    return total + row.reduce((rowTotal, cell) => {
      return rowTotal + Number(cell === '~');
    }, 0);
  }, 0);

  return res;
}