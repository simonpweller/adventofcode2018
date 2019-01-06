const { parseInput, step } = require('./utils');

module.exports = function (lines) {
  let { locations, notes } = parseInput(lines);
  for (let generation = 0; generation < 20; generation++) {
    locations = step(locations, notes);
  }
  return locations.reduce((prev, curr) => prev += curr, 0);
}