function parseInput(lines) {
  const map = lines.map(line => line.split(''));
  const goblins = [];
  const elves = [];

  map.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === 'G') {
        goblins.push({
          x: colIndex,
          y: rowIndex,
        });
      } else if (cell === 'E') {
        elves.push({
          x: colIndex,
          y: rowIndex,
        });
      }
    });
  });

  return {
    map,
    goblins,
    elves,
  }
}

function findNearestTargets(actor, originalMap) {
  const map = [...originalMap];
  const targets = [];
  const { x, y } = actor;
  let lastPositions = [{ x, y }];
  let step = 1;

  while (targets.length === 0) {
    const nextPositions = [];
    for (position of lastPositions) {
      const { x, y } = position;
      const left = map[y][x - 1];
      if (left === 'G') {
        targets.push({ y, x });
      } else if (left === '.') {
        nextPositions.push({ y, x: x - 1 });
        map[y][x - 1] = step;
      }
      const right = map[y][x + 1];
      if (right === 'G') {
        targets.push({ y, x });
      } else if (right === '.') {
        nextPositions.push({ y, x: x + 1 });
        map[y][x + 1] = step;
      }
      const up = map[y - 1][x];
      if (up === 'G') {
        targets.push({ y, x });
      } else if (up === '.') {
        nextPositions.push({ y: y - 1, x });
        map[y - 1][x] = step;
      }
      const down = map[y + 1][x];
      if (down === 'G') {
        targets.push({ y, x });
      } else if (down === '.') {
        nextPositions.push({ y: y + 1, x });
        map[y + 1][x] = step;
      }
    }
    step++;
    lastPositions = nextPositions;
  }
  return targets;
}

module.exports = {
  parseInput,
  findNearestTargets,
}