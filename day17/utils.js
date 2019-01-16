function parseInput(lines) {
  const clays = lines.reduce((clays, line) => clays.concat(...parseVein(line)), []);

  const { xMin, xMax, yMax } = getRanges(clays);

  const rows = Array.from({ length: yMax + 1 }, v => Array.from({ length: xMax - xMin + 3 }, v => '.'));

  const xOffset = -xMin + 1;

  rows[0][500 + xOffset] = '+';

  for (clay of clays) {
    const { x, y } = clay;
    rows[y][x + xOffset] = '#';
  }

  return rows;
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

module.exports = {
  parseInput,
  parseVein,
}