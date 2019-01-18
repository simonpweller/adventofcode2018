const { simulate } = require('./utils');

module.exports = function (lines) {
  const simulationResult = simulate(lines);

  return simulationResult.reduce((total, row) => {
    return total + row.reduce((rowTotal, cell) => {
      return rowTotal + Number(['|', '~'].includes(cell));
    }, 0);
  }, 0);
}