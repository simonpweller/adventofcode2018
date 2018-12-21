const { createGrid, parseLine } = require('./solve1');


module.exports = function (lines) {
  const grid = createGrid(lines);
  const line = lines.map(parseLine).find(line => {
    for (let y = line.top; y < (line.top + line.height); y++) {
      for (let x = line.left; x < (line.left + line.width); x++) {
        if (grid[y][x] > 1) return false;
      }
    }
    return true;
  });
  return line.id;
}
