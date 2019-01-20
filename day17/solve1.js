const { simulate } = require('./utils');

module.exports = function (lines) {
  const simulationResult = simulate(lines);

  const res = simulationResult.reduce((total, row) => {
    return total + row.reduce((rowTotal, cell) => {
      return rowTotal + Number(['|', '~'].includes(cell));
    }, 0);
  }, 0);

  console.log(simulationResult.slice(0, 130).map(row => row.join('')).join('\n'))
  return res;
}