module.exports = function (lines, size = 10000) {
  const coordinates = lines.map(line => line.split(', ')).map(point => point.map(parseFloat));
  const [xCoordinates, yCoordinates] = [coordinates.map(point => point[0]), coordinates.map(point => point[1])];
  const [xMin, xMax] = [Math.min(...xCoordinates), Math.max(...xCoordinates)];
  const [yMin, yMax] = [Math.min(...yCoordinates), Math.max(...yCoordinates)];
  let area = 0;
  for(let y = yMin; y <= yMax; y++) {
    for(let x = xMin; x <= xMax; x++) {
      let distance = 0;
      coordinates.forEach(point => {
        distance += Math.abs(point[0] - x) + Math.abs(point[1] - y);
      });
      if(distance < size) {
        area++;
      }
    }
  }
  return area;
}