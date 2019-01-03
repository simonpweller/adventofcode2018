const utils = require('./solve1');
const { parseInput, playGame } = utils;

module.exports = function (lines) {
  const { players, lastMarble } = parseInput(lines);
  const scores = playGame(lastMarble * 100, players).scores;
  return Math.max(...Object.values(scores));
}