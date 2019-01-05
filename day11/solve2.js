const utils = require('./solve1');
const { createGrid, calculateTotalPower } = utils;

module.exports = function (lines) {
  const grid = createGrid(lines);

  // calculate 3x3 square which has the largest total power
  let currentMaxValue = -Infinity;
  let currentMaxSquareSize;
  let currentMaxX;
  let currentMaxY;

  for (let squareSize = 1; squareSize <= 300; squareSize++) {
    for (let y = 1; y < 300 - squareSize; y++) {
      for (let x = 1; x < 300 - squareSize; x++) {
        const totalPower = calculateTotalPower(grid, x, y, squareSize);
        if (totalPower > currentMaxValue) {
          [currentMaxValue, currentMaxX, currentMaxY, currentMaxSquareSize] = [totalPower, x, y, squareSize];
        }
      }
    }
  }
  return `${currentMaxX},${currentMaxY},${currentMaxSquareSize}`;
}