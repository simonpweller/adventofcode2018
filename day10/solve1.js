module.exports = function (lines, seconds) {
  let points = parseInput(lines);
  points = seconds === undefined ? advanceToAlignment(points) : advance(points, seconds);
  return draw(points);
}

function advanceToAlignment(points) {
  while (true) {
    const nextPoints = step(points);
    if (height(nextPoints) > height(points)) {
      break;
    }
    points = [...nextPoints];
  }
  return points;
}

function height(points) {
  const yCoords = points.map(point => point.position.y);
  return (Math.max(...yCoords) - Math.min(...yCoords));
}

function advance(points, seconds) {
  for (let i = 0; i < seconds; i++) {
    points = step(points);
  }
  return points;
}

function step(points) {
  return points.map(point => ({
    ...point,
    position: {
      x: point.position.x + point.velocity.x,
      y: point.position.y + point.velocity.y,
    },
  }));
}

function draw(points) {
  // set up map
  const positions = points.map(point => point.position);
  const xCoords = positions.map(position => position.x);
  const yCoords = positions.map(position => position.y);

  const xMax = Math.max(...xCoords);
  const xMin = Math.min(...xCoords);
  const yMax = Math.max(...yCoords);
  const yMin = Math.min(...yCoords);

  const xRange = xMax - xMin;
  const yRange = yMax - yMin;

  const row = Array.from({ length: xRange + 1 }, x => '.');
  const map = Array.from({ length: yRange + 1 }, x => [...row]);

  // draw on map
  for (let { position } of points) {
    map[position.y - yMin][position.x - xMin] = '#';
  }

  return map.map(row => row.join(''));
}

function parseInput(lines) {
  return lines.map(line => {
    const [match, xPos, yPos, xVel, yVel] = line
      .match(/position=<\s*(-?\d+),\s*(-?\d+)> velocity=<\s*(-?\d+),\s*(-?\d+)>/)
      .map(parseFloat);

    return {
      position: {
        x: xPos,
        y: yPos,
      },
      velocity: {
        x: xVel,
        y: yVel,
      },
    }
  })
}

module.exports.parseInput = parseInput;
module.exports.height = height;
module.exports.step = step;