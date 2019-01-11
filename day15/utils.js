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

function readingOrder(a, b) {
  if (a.y < b.y) return -1;
  if (a.y > b.y) return 1;
  if (a.x < b.x) return -1;
  if (a.x > b.x) return 1;
}

const offsets = {
  left: {
    x: -1,
    y: 0,
  },
  right: {
    x: 1,
    y: 0,
  },
  up: {
    x: 0,
    y: -1,
  },
  down: {
    x: 0,
    y: 1,
  },
}

function findNearestTargets(actor, originalMap) {
  const map = [...originalMap];
  const targets = [];
  const { x, y } = actor;
  const targetType = actor.type === 'E' ? 'G' : 'E';
  let lastPositions = [{ x, y }];
  let step = 1;

  while (targets.length === 0) {
    const nextPositions = [];
    for (position of lastPositions) {
      const { x, y } = position;
      for (offset of Object.values(offsets)) {
        const targetX = x + offset.x;
        const targetY = y + offset.y;
        const target = map[targetY][targetX];
        if (target === targetType) {
          targets.push({ y, x });
        } else if (target === '.') {
          nextPositions.push({ y: targetY, x: targetX });
          map[targetY][targetX] = step;
        }
      }
    }
    step++;
    lastPositions = nextPositions;
  }
  return targets;
}

function selectTarget(actor, map) {
  const targets = findNearestTargets(actor, map);
  targets.sort(readingOrder);
  return targets[0];
}

module.exports = {
  parseInput,
  readingOrder,
  findNearestTargets,
  selectTarget,
}