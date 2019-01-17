function simulate(lines, turns) {
  const map = parseInput(lines);

  let currentPosition = getBelow(getStartingPosition(map));
  for (let i = 0; i < turns; i++) {
    const below = getBelow(currentPosition);
    const cellBelow = getCell(map, below);
    if (cellBelow === '.') {
      setCell(map, currentPosition, '|');
      currentPosition = below;
    } else if (cellBelow === '#') {
      setCell(map, currentPosition, '~');

    }
  }

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
  return map[y][x];
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

module.exports = {
  simulate,
  parseInput,
  parseVein,
  getCell,
  setCell,
}