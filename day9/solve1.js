const LinkedList = require('../linkedList');

module.exports = function (lines) {
  const { players, lastMarble } = parseInput(lines);
  const scores = playGame(lastMarble, players).scores;
  return Math.max(...Object.values(scores));
}

function parseInput([line]) {
  const [match, players, lastMarble] = line.match(/(\d+) players; last marble is worth (\d+) points/).map(parseFloat);
  return {
    players,
    lastMarble,
  };
}

function playGame(turns = 0, players = 1) {
  const game = new LinkedList(0);
  const scores = {};
  let currentPlayer = 0;

  for (let i = 1; i <= turns; i++) {
    currentPlayer++;
    if (currentPlayer > players) {
      currentPlayer = 1;
    }

    if (i % 23 === 0) {
      if (!scores[currentPlayer]) {
        scores[currentPlayer] = 0;
      }
      game.back(7);
      scores[currentPlayer] += game.popCurrent() + i;
    } else {
      game.step();
      game.insertAfterCurrent(i);
      game.step();
    }
  }

  game.rewind();
  return {
    circle: game.printArray(),
    currentPlayer,
    scores,
  }
}

module.exports.parseInput = parseInput;
module.exports.playGame = playGame;