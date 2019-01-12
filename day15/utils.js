function parseInput(lines) {
  const map = lines.map(line => line.split(''));
  const actors = [];

  map.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === 'G' || cell === 'E') {
        actors.push({
          x: colIndex,
          y: rowIndex,
          type: cell,
        });
      }
    });
  });

  return {
    map,
    actors,
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
  const map = [...originalMap.map(row => [...row])];
  const targets = [];
  const { x, y } = actor;
  const targetType = actor.type === 'E' ? 'G' : 'E';
  let lastPositions = [{ x, y }];
  let step = 1;
  let previouslyExploredSquares = 0;
  let exploredSquares = 0;

  do {
    previouslyExploredSquares = exploredSquares;
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
          exploredSquares++;
        }
      }
    }
    step++;
    lastPositions = nextPositions;
  } while (targets.length === 0 && exploredSquares > previouslyExploredSquares);
  return targets;
}

function selectTarget(actor, map) {
  const targets = findNearestTargets(actor, map);
  if (targets.length === 0) return null;
  targets.sort(readingOrder);
  return targets[0];
}

function chooseStep(actor, originalMap) {
  const map = [...originalMap.map(row => [...row])];
  const destination = selectTarget(actor, map);
  if (!destination || (destination.x === actor.x && destination.y === actor.y)) return null;
  const { x, y } = destination;
  const stepOptions = [];
  let lastPositions = [{ x, y }];
  let step = 1;

  while (stepOptions.length === 0 && step < 10) {
    const nextPositions = [];
    for (position of lastPositions) {
      const { x, y } = position;
      for (offset of Object.values(offsets)) {
        const targetX = x + offset.x;
        const targetY = y + offset.y;
        const target = map[targetY][targetX];
        if (targetX === actor.x && targetY === actor.y) {
          stepOptions.push({ y, x });
        } else if (target === '.') {
          nextPositions.push({ y: targetY, x: targetX });
          map[targetY][targetX] = step;
        }
      }
    }
    step++;
    lastPositions = nextPositions;
  }
  stepOptions.sort(readingOrder);
  return stepOptions[0];
}

function takeTurns(rawMap, turns) {
  const { map, actors } = parseInput(rawMap);
  for (let i = 0; i < turns; i++) {
    actors.sort(readingOrder);
    actors.forEach((actor, index) => {
      const step = chooseStep(actor, map);
      if (step) {
        actors[index] = {
          ...actor,
          ...step,
        };
        map[actor.y][actor.x] = '.';
        map[step.y][step.x] = actor.type;
      }
    });

  }

  return {
    map: map.map(row => row.join('')),
  }
}

module.exports = {
  parseInput,
  readingOrder,
  findNearestTargets,
  selectTarget,
  chooseStep,
  takeTurns,
}