const utils = require('./solve1');
const { parseInput, height, step } = utils;

module.exports = function (lines) {
  let points = parseInput(lines);
  let seconds = 0;
  while (true) {
    const nextPoints = step(points);
    if (height(nextPoints) > height(points)) {
      break;
    }
    seconds++;
    points = [...nextPoints];
  }
  return seconds;
}