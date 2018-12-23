module.exports = function (lines) {
  const coordinates = lines.map(line => line.split(', ')).map(point => point.map(parseFloat));
  const [xCoordinates, yCoordinates] = [coordinates.map(point => point[0]), coordinates.map(point => point[1])];
  const [xMin, xMax] = [Math.min(...xCoordinates), Math.max(...xCoordinates)];
  const [yMin, yMax] = [Math.min(...yCoordinates), Math.max(...yCoordinates)];
  const nearest = {};
  const infiniteAreas = new Set();
  for(let y = yMin; y <= yMax; y++) {
    for(let x = xMin; x <= xMax; x++) {
      const distances = coordinates.map((point, index) => {
        return {
          index, 
          distance: Math.abs(point[0] - x) + Math.abs(point[1] - y),
        };
      });
      const minDistance = Math.min(...distances.map(point => point.distance));
      const nearestPoints = distances.filter(point => point.distance === minDistance);
      if (nearestPoints.length === 1) {
        const index = nearestPoints[0].index;
        nearest[index] = nearest[index] ? nearest[index] + 1 : 1;
        if (x === xMin || x === xMax || y === yMin || y === yMax) {
          infiniteAreas.add(index);
        }
      }
    }
  }

  const finiteAreas = Object.entries(nearest)
    .filter(entry => !infiniteAreas.has(+entry[0]))
    .map(area => area[1]);
    
  return Math.max(...finiteAreas);
}