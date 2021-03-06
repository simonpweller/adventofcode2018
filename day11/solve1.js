module.exports = function (lines) {
  const grid = createGrid(lines);

  // calculate 3x3 square which has the largest total power
  let currentMaxValue = -Infinity;
  let currentMaxX;
  let currentMaxY;

  const squareSize = 3;
  for (let y = 1; y < 300 - squareSize; y++) {
    for (let x = 1; x < 300 - squareSize; x++) {
      const totalPower = calculateTotalPower(grid, x, y, squareSize);
      if (totalPower > currentMaxValue) {
        [currentMaxValue, currentMaxX, currentMaxY] = [totalPower, x, y];
      }
    }
  }
  return `${currentMaxX},${currentMaxY}`;
}

function createGrid(lines) {
  const serial = parseInput(lines);
  const grid = [];
  for (let y = 1; y <= 300; y++) {
    const row = [];
    for (let x = 1; x <= 300; x++) {
      row.push(squarePower(x, y, serial));
    }
    grid.push(row);
  }
  return grid;
}

function calculateTotalPower(grid, x, y, size) {
  let totalPower = 0;
  for (let yOffset = -1; yOffset < size - 1; yOffset++) {
    for (let xOffset = -1; xOffset < size - 1; xOffset++) {
      totalPower += grid[y + yOffset][x + xOffset];
    }
  }
  return totalPower;
}

function squarePower(x, y, serial) {
  // Find the fuel cell's rack ID, which is its X coordinate plus 10.
  const rackId = x + 10;
  // Begin with a power level of the rack ID times the Y coordinate.
  let power = rackId * y;
  // Increase the power level by the value of the grid serial number (your puzzle input).
  power += serial;
  // Set the power level to itself multiplied by the rack ID.
  power *= rackId;
  // Keep only the hundreds digit of the power level (so 12345 becomes 3; numbers with no hundreds digit become 0).
  power = Math.floor(power / 100 % 10);
  // Subtract 5 from the power level.
  power -= 5;

  return power;
}

function parseInput([line]) {
  return parseFloat(line);
}

module.exports.parseInput = parseInput;
module.exports.squarePower = squarePower;
module.exports.calculateTotalPower = calculateTotalPower;
module.exports.createGrid = createGrid;