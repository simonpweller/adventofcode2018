module.exports = function (lines) {
  const grid = createGrid(lines);
  return grid.reduce((total, row) => {
    return total + row.reduce((rowTotal, cell) => {
      return rowTotal + Number(cell >= 2);
    }, 0);
  }, 0);
}

function createGrid(lines) {
  const grid = [];
  lines.map(parseLine).forEach(line => {
    for (let y = line.top; y < (line.top + line.height); y++) {
      for (let x = line.left; x < (line.left + line.width); x++) {
        if (!grid[y]) grid[y] = [];
        if (!grid[y][x]) grid[y][x] = 0;
        grid[y][x]++;
      }
    }
  });
  return grid;
}

function parseLine(line) {
  const [match, id, left, top, width, height] = line.match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/).map(match => +match);
  return { id, left, top, width, height };
}

module.exports.createGrid = createGrid;
module.exports.parseLine = parseLine;