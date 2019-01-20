function parseInput(lines) {
  return lines.map(line => line.split(''));
}

function transitionMap(map) {
  const newMap = [];
  for (let y = 0; y < map.length; y++) {
    const newRow = [];
    for (let x = 0; x < map[0].length; x++) {
      newRow.push(transitionField(map, { x, y }));
    }
    newMap.push(newRow);
  }
  return newMap;
}

function transitionField(map, position) {
  const { x, y } = position;
  switch (map[y][x]) {
    case '.':
      return adjacentTrees(map, position) >= 3 ? '|' : '.';
    case '|':
      return adjacentLumber(map, position) >= 3 ? '#' : '|';
    case '#':
      return adjacentLumber(map, position) && adjacentTrees(map, position) ? '#' : '.';
  }
}

function adjacentTrees(map, position) {
  return adjacentFields(map, position).filter(field => field === '|').length;
}

function adjacentLumber(map, position) {
  return adjacentFields(map, position).filter(field => field === '#').length;
}

function adjacentOpen(map, position) {
  return adjacentFields(map, position).filter(field => field === '.').length;
}

function adjacentFields(map, { x, y }) {
  const adjacentFields = [];
  for (let yOffset = -1; yOffset < 2; yOffset++) {
    for (let xOffset = -1; xOffset < 2; xOffset++) {
      if (xOffset === 0 && yOffset === 0) continue;
      if (map[y + yOffset] && map[y + yOffset][x + xOffset]) {
        adjacentFields.push(map[y + yOffset][x + xOffset]);
      }
    }
  }
  return adjacentFields;
}

module.exports = {
  parseInput,
  transitionMap,
  transitionField,
  adjacentTrees,
  adjacentLumber,
  adjacentOpen,
  adjacentFields,
}