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
  const circle = [0];
  const scores = {};
  let currentMarbleIndex = 0;
  let currentPlayer = 0;

  for (let i = 1; i <= turns; i++) {
    const trailingMarbles = circle.length - currentMarbleIndex - 1;

    currentPlayer++;
    if (currentPlayer > players) {
      currentPlayer = 1;
    }

    if (i % 23 === 0) {
      currentMarbleIndex -= 7;
      if (currentMarbleIndex < 0) {
        currentMarbleIndex = circle.length + currentMarbleIndex;
      }

      if (!scores[currentPlayer]) {
        scores[currentPlayer] = 0;
      }
      scores[currentPlayer] += circle.splice(currentMarbleIndex, 1)[0] + i;
    } else {
      switch (trailingMarbles) {
        case 0:
          circle.splice(1, 0, i);
          currentMarbleIndex = 1;
          break;
        case 1:
          circle.push(i);
          currentMarbleIndex = circle.length - 1;
          break;
        default:
          circle.splice(currentMarbleIndex + 2, 0, i);
          currentMarbleIndex = currentMarbleIndex + 2;
      }
    }
  }

  return {
    circle,
    currentMarbleIndex,
    currentPlayer,
    scores,
  }
}

module.exports.parseInput = parseInput;
module.exports.playGame = playGame;