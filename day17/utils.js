function Drop(map, { x, y }, drops) {
  this.map = map;
  this.position = { x, y };
  this.drops = drops;
  this.drops.push(this);
}

Drop.prototype.flow = function () {
  if (getCell(this.map, this.position) === '~') {
    return true;
  }

  const cellBelow = getCellBelow(this.map, this.position);
  if (cellBelow === '#' || cellBelow === '~') {
    if (blockedLeft(this.map, this.position) && blockedRight(this.map, this.position)) {
      setCell(this.map, this.position, '~');
      return false;
    } else {
      setCell(this.map, this.position, '|');
      let isStable = true;

      const left = getLeft(this.position);
      if (getCell(this.map, left) === '.') {
        setCell(this.map, left, '|');
        new Drop(this.map, left, this.drops);
        isStable = false;
      }

      const right = getRight(this.position);
      if (getCell(this.map, right) === '.') {
        setCell(this.map, right, '|');
        new Drop(this.map, right, this.drops);
        isStable = false;
      }
      return isStable;
    }
  } else if (cellBelow === '.') {
    setCell(this.map, this.position, '|');
    setCell(this.map, getBelow(this.position), '|');
    new Drop(this.map, getBelow(this.position), this.drops);
    return false;
  } else {
    return true;
  }
}

function simulate(lines) {
  const map = parseInput(lines);
  const startingPosition = getBelow(getStartingPosition(map));
  const drops = [];
  let done = false;
  new Drop(map, startingPosition, drops);

  while (done === false) {
    done = true;
    for (drop of drops) {
      const dropDone = drop.flow();
      if (!dropDone) done = false;
    }
  }
  return map;
}

function blockedLeft(map, position) {
  let left = getLeft(position);
  let leftCell = getCell(map, left);
  while (leftCell && leftCell !== '.') {
    if (leftCell === '#') return true;
    left = getLeft(left);
    leftCell = getCell(map, left);
  }
  return false;
}

function blockedRight(map, position) {
  let right = getRight(position);
  let rightCell = getCell(map, right);
  while (rightCell && rightCell !== '.') {
    if (rightCell === '#') return true;
    right = getRight(right);
    rightCell = getCell(map, right);
  }
  return false;
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

function getCellBelow(map, position) {
  return getCell(map, getBelow(position));
}

function getBelow({ x, y }) {
  return {
    x,
    y: y + 1,
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
  Drop,
  simulate,
  parseInput,
  parseVein,
  getCell,
  setCell,
}