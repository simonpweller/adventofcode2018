function flowDown(map, startingPosition) {
  const startingHeight = startingPosition.y;
  let currentPosition = { ...startingPosition };
  let currentCell = getCell(map, currentPosition)
  let hasFallen;

  // water falls downwards as long as there is space
  while (currentCell === '.') {
    hasFallen = true;
    setCell(map, currentPosition, '|');
    below = getBelow(currentPosition);
    currentPosition = below;
    currentCell = getCell(map, currentPosition);
  }

  if (!currentCell) {
    return false;
  }

  if (hasFallen) {
    currentPosition = getAbove(currentPosition);
  }

  // when it hits ground it expands as far as it can
  const left = getLeft(currentPosition);
  const cellLeft = getCell(map, left);
  const right = getRight(currentPosition);
  const cellRight = getCell(map, right);

  const rightBlocked = cellRight === '~' || cellRight === '|' || cellRight === '#' || flowDown(map, right);
  const leftBlocked = cellLeft === '~' || cellLeft === '|' || cellLeft === '#' || flowDown(map, left);

  // if it is blocked in, it pushes up
  if (leftBlocked && rightBlocked) {
    setCell(map, currentPosition, '~');
    currentPosition = getAbove(currentPosition);

    while (startingHeight < currentPosition.y) {
      const left = getLeft(currentPosition);
      const cellLeft = getCell(map, left);
      const right = getRight(currentPosition);
      const cellRight = getCell(map, right);
      const rightBlocked = cellRight === '~' || cellRight === '|' || cellRight === '#' || flowDown(map, right);
      const leftBlocked = cellLeft === '~' || cellLeft === '|' || cellLeft === '#' || flowDown(map, left);
      if (leftBlocked && rightBlocked) {
        setCell(map, currentPosition, '~');
        currentPosition = getAbove(currentPosition);
      } else {
        return false;
      }
    }
    return true;
  }
  return false;
}

function simulate(lines) {
  const map = parseInput(lines);
  const startingPosition = getBelow(getStartingPosition(map));
  flowDown(map, startingPosition);
  return map;
}

function getStartingPosition(map) {
  return {
    x: map[0].findIndex(cell => cell === '+'),
    y: 0,
  }
}

function parseInput(lines) {
  const clays = lines.reduce((clays, line) => clays.concat(...parseVein(line)), []);

  const { xMin, xMax, yMax } = getRanges(clays);

  const map = Array.from({ length: yMax + 1 }, v => Array.from({ length: xMax - xMin + 3 }, v => '.'));

  const xOffset = -xMin + 1;

  map[0][500 + xOffset] = '+';

  for (clay of clays) {
    const { x, y } = clay;
    map[y][x + xOffset] = '#';
  }

  return map;
}

function getRanges(coords) {
  const xVals = coords.map(clay => clay.x);
  const xMin = Math.min(...xVals);
  const xMax = Math.max(...xVals);

  const yVals = coords.map(clay => clay.y);
  const yMin = Math.min(...yVals);
  const yMax = Math.max(...yVals);

  return {
    xMin,
    xMax,
    yMin,
    yMax,
  };
}

function parseVein(vein) {
  const [match, fix, min, max] = vein.match(/[xy]=(\d+), [xy]=(\d+)..(\d+)/).map(parseFloat);
  const range = Array.from({ length: max - min + 1 }, (v, i) => i + min);
  return vein.startsWith('x') ? range.map(y => ({ x: fix, y })) : range.map(x => ({ x, y: fix }));
}

function getCell(map, { x, y }) {
  try {
    return map[y][x];
  } catch (e) {
    return undefined;
  }
}

function setCell(map, { x, y }, value) {
  map[y][x] = value;
  return map;
}

function getBelow({ x, y }) {
  return {
    x,
    y: y + 1,
  }
}

function getAbove({ x, y }) {
  return {
    x,
    y: y - 1,
  }
}

function getLeft({ x, y }, offset = 1) {
  return {
    x: x - offset,
    y,
  }
}

function getRight({ x, y }, offset = 1) {
  return {
    x: x + offset,
    y,
  }
}

module.exports = {
  simulate,
  parseInput,
  parseVein,
  getCell,
  setCell,
}