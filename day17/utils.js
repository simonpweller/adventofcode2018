function simulate(lines) {
  const map = parseInput(lines);
  let startingPositions = [getStartingPosition(map)];
  let i = 0;
  while (startingPositions.length) {
    const startingPosition = startingPositions.pop();
    if (i === 13) {
      setCell(map, startingPosition, '*');
      console.log(map.slice(0, 400).map(row => row.join('')).join('\n'));
    }
    const newStartingPositions = simulateFromStartingPosition(map, startingPosition, i === 13);

    if (newStartingPositions) {
      startingPositions.push(...newStartingPositions);
    }
  }
  return map;
}

function simulateFromStartingPosition(map, startingPosition, log) {
  mainLoop: while (true) {
    if (log) {
      console.log(map.slice(0, 400).map(row => row.join('')).join('\n'));
    }
    let currentPosition = getBelow(startingPosition);
    let below = getBelow(currentPosition);
    let cellBelow = getCell(map, below);

    // water falls downwards as long as there is space
    while (cellBelow === '.' || cellBelow === '|') {
      if (cellBelow === '.') setCell(map, currentPosition, '|');
      currentPosition = below;
      below = getBelow(currentPosition);
      cellBelow = getCell(map, below);
    }

    if (!cellBelow) {
      setCell(map, currentPosition, '|');
      return;
    };

    // when it hits clay it comes to rest
    if (cellBelow === '#') {
      setCell(map, currentPosition, '~');
      continue;
    }

    // when it hits water it pushes it to the side
    // check if the cell to the left or right of the one below is free - if so, add water
    let offsetLeft = 1;
    let offsetRight = 1;
    let left = getLeft(below, offsetLeft);
    let cellLeft = getCell(map, left);
    let right = getRight(below, offsetRight);
    let cellRight = getCell(map, right);
    while (cellLeft !== '#' || cellRight !== '#') {
      if (cellLeft === '.') {
        setCell(map, left, '~');
        continue mainLoop;
      } else if (cellRight === '.') {
        setCell(map, right, '~');
        continue mainLoop;
      } else {
        if (cellLeft === '~') {
          offsetLeft++;
          left = getLeft(below, offsetLeft);
          cellLeft = getCell(map, left);
        }
        if (cellRight === '~') {
          offsetRight++;
          right = getRight(below, offsetRight);
          cellRight = getCell(map, right);
        }
      }
    }

    // if there is nowhere for the water to spread, it pushes up
    if (isContainedLeft(map, currentPosition) && isContainedRight(map, currentPosition)) {
      setCell(map, currentPosition, '~');
    } else { // or overflows
      const newStartingPositions = [];

      let left = getLeft(currentPosition);
      let cellLeft = getCell(map, left);
      let cellBelowLeft = getCell(map, getBelow(left));
      while (cellLeft !== '#' && cellBelowLeft !== '.') {
        setCell(map, left, '|');
        left = getLeft(left);
        cellLeft = getCell(map, left);
        cellBelowLeft = getCell(map, getBelow(left));
      }

      if (cellBelowLeft === '.') {
        setCell(map, left, '|');
        newStartingPositions.push(left);
      }

      let right = getRight(currentPosition);
      let cellRight = getCell(map, right);
      let cellBelowRight = getCell(map, getBelow(right));
      while (cellRight !== '#' && cellBelowRight !== '.') {
        setCell(map, right, '|');
        right = getRight(right);
        cellRight = getCell(map, right);
        cellBelowRight = getCell(map, getBelow(right));
      }

      if (cellBelowRight === '.') {
        setCell(map, right, '|');
        newStartingPositions.push(right);
      }

      return newStartingPositions;
    }
  }
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

function isContainedLeft(map, position) {
  let currentPosition = { ...position };
  while (getCell(map, getBelow(currentPosition)) !== '.') {
    if (getCell(map, getLeft(currentPosition)) === '.') {
      currentPosition = getLeft(currentPosition);
    } else {
      return true;
    }
  }
  return false;
}

function isContainedRight(map, position) {
  let currentPosition = { ...position };
  while (getCell(map, getBelow(currentPosition)) !== '.') {
    if (getCell(map, getRight(currentPosition)) === '.') {
      currentPosition = getRight(currentPosition);
    } else {
      return true;
    }
  }
  return false;
}

module.exports = {
  simulate,
  parseInput,
  parseVein,
  getCell,
  setCell,
}