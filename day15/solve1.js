const { parseInput, takeSingleTurn } = require('./utils');

module.exports = function (lines) {
  let { map, actors } = parseInput(lines);
  let finalTurn = false;
  let turns = 0;
  while (!finalTurn) {
    const turnResults = takeSingleTurn(map, actors);
    map = turnResults.map;
    actors = turnResults.actors;
    finalTurn = turnResults.finalTurn;
    turns++;
  }

  const fullRounds = turns - 1;
  const hitPoints = actors.reduce((prev, curr) => prev + curr.hitPoints, 0);
  return fullRounds * hitPoints;
}