const { parseInput, takeSingleTurn } = require('./utils');

module.exports = function (lines) {
  let map, actors, finalTurn, turns, parsedInput;
  const numberOfElves = parseInput(lines).actors.filter(actor => actor.type === 'E').length;
  let attackStrength = 3;

  while (true) {
    parsedInput = parseInput(lines);
    map = parsedInput.map;
    actors = parsedInput.actors.map(actor => {
      if (actor.type === 'E') {
        actor.attackStrength = attackStrength;
      }
      return actor;
    });

    finalTurn = false;
    turns = 0;

    while (!finalTurn) {
      const turnResults = takeSingleTurn(map, actors);
      map = turnResults.map;
      actors = turnResults.actors;
      finalTurn = turnResults.finalTurn;
      turns++;
    }
    attackStrength++;

    if (actors.filter(actor => actor.type === 'E').length === numberOfElves) {
      const fullRounds = turns - 1;
      const hitPoints = actors.reduce((prev, curr) => prev + curr.hitPoints, 0);
      // return map.map(row => row.join('')).join('\n');
      return fullRounds * hitPoints;
      // return actors;
    }
  }
}