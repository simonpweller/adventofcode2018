const { parseInput, step } = require('./utils');

module.exports = function (lines) {
  let { locations, notes } = parseInput(lines);
  for (let generation = 1; generation < 1000; generation++) {
    const prevScore = locations.reduce((prev, curr) => prev += curr, 0);
    locations = step(locations, notes);
    const score = locations.reduce((prev, curr) => prev += curr, 0);

    const nextScore = step(locations, notes).reduce((prev, curr) => prev += curr, 0);
    if (score - prevScore === nextScore - score) {
      return score + (50000000000 - generation) * (score - prevScore);
    }
  }
  return 'Solution has not converged!';
}