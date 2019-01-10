const { parseInput, step } = require('./utils');

module.exports = function (lines) {
  const finalRecipes = parseInput(lines);
  const scores = [3, 7];
  let positions = [0, 1];
  const digitsToCheck = finalRecipes.split('').reverse().map(parseFloat);

  while (!digitsToCheck.every((digit, index) => digit === scores[scores.length - index - 1]) && !digitsToCheck.every((digit, index) => digit === scores[scores.length - index - 2])) {
    step({ scores, positions });
  }
  return scores.join('').indexOf(finalRecipes);
}