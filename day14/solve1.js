const { parseInput, nRecipes } = require('./utils');

module.exports = function (lines) {
  const practiceRecipes = parseFloat(parseInput(lines));
  const recipes = nRecipes(practiceRecipes + 10);
  return recipes.slice(practiceRecipes).join('');
}