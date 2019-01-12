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
          hitPoints: 200,
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

const offsets = [
  {
    x: -1,
    y: 0,
  },
  {
    x: 1,
    y: 0,
  },
  {
    x: 0,
    y: -1,
  },
  {
    x: 0,
    y: 1,
  },
]

function getTargetType(actor) {
  return actor.type === 'E' ? 'G' : 'E';
}

function findNearestTargets(actor, originalMap) {
  const map = [...originalMap.map(row => [...row])];
  const targets = [];
  const { x, y } = actor;
  const targetType = getTargetType(actor);
  let lastPositions = [{ x, y }];
  let step = 1;
  let previouslyExploredSquares = 0;
  let exploredSquares = 0;

  do {
    previouslyExploredSquares = exploredSquares;
    const nextPositions = [];
    for (position of lastPositions) {
      const { x, y } = position;
      for (offset of offsets) {
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

  while (stepOptions.length === 0) {
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

function getAttackTarget(actor, map, units) {
  const targetType = getTargetType(actor);
  const { x, y } = actor;
  const targetLocations = [];

  for (offset of offsets) {
    const targetX = x + offset.x;
    const targetY = y + offset.y;
    const target = map[targetY][targetX];
    if (target === targetType) {
      targetLocations.push({ x: targetX, y: targetY });
    }
  }

  const targets = targetLocations.map(targetLocation => {
    return units.find(unit => unit.x === targetLocation.x && unit.y === targetLocation.y);
  });

  if (!targets.length) return null;
  if (targets.lengths === 1) return targets[0];

  const minHitpoints = Math.min(...targets.map(target => target.hitPoints));
  return targets.find(target => target.hitPoints === minHitpoints);
}

function takeTurns(rawMap, turns) {
  let { map, actors } = parseInput(rawMap);
  for (let i = 0; i < turns; i++) {
    const turnResults = takeSingleTurn(map, actors);
    map = turnResults.map;
    actors = turnResults.actors;
  }

  return {
    map: map.map(row => row.join('')),
    actors,
  }
}

function takeSingleTurn(map, actors) {
  let finalTurn = false;

  actors.forEach(actor => {
    if (actor.hitPoints > 0) {
      // no target found - combat ends in this round
      if (!actors.find(unit => unit.type === getTargetType(actor))) finalTurn = true;
      const step = chooseStep(actor, map);
      if (step) {
        // update map
        map[actor.y][actor.x] = '.';
        map[step.y][step.x] = actor.type;
        // update actor
        actor.y = step.y;
        actor.x = step.x;
      }
      const attackTarget = getAttackTarget(actor, map, actors);
      if (attackTarget) {
        attackTarget.hitPoints -= 3;
        if (attackTarget.hitPoints <= 0) {
          // remove dead target
          map[attackTarget.y][attackTarget.x] = '.';
          actors = actors.filter(actor => actor.hitPoints >= 0);
        }
      }
    }
  });

  actors.sort(readingOrder);

  return {
    actors,
    map,
    finalTurn,
  }
}

module.exports = {
  parseInput,
  readingOrder,
  findNearestTargets,
  selectTarget,
  chooseStep,
  getAttackTarget,
  takeTurns,
  takeSingleTurn,
}