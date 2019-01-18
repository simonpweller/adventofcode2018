const solve1 = require('./solve1');
const { simulate, parseInput, parseVein, getCell, setCell } = require('./utils');

const lines = [
  'x=495, y=2..7',
  'y=7, x=495..501',
  'x=501, y=3..7',
  'x=498, y=2..4',
  'x=506, y=1..2',
  'x=498, y=10..13',
  'x=504, y=10..13',
  'y=13, x=498..504',
];

const map = [
  ['.', '.', '.', '.', '.', '.', '+', '.', '.', '.', '.', '.', '.', '.',],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '#', '.',],
  ['.', '#', '.', '.', '#', '.', '.', '.', '.', '.', '.', '.', '#', '.',],
  ['.', '#', '.', '.', '#', '.', '.', '#', '.', '.', '.', '.', '.', '.',],
  ['.', '#', '.', '.', '#', '.', '.', '#', '.', '.', '.', '.', '.', '.',],
  ['.', '#', '.', '.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.',],
  ['.', '#', '.', '.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '.',],
  ['.', '#', '#', '#', '#', '#', '#', '#', '.', '.', '.', '.', '.', '.',],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.',],
  ['.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '#', '.', '.', '.',],
  ['.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '#', '.', '.', '.',],
  ['.', '.', '.', '.', '#', '.', '.', '.', '.', '.', '#', '.', '.', '.',],
  ['.', '.', '.', '.', '#', '#', '#', '#', '#', '#', '#', '.', '.', '.',],
];

describe('solve1', () => {
  it('returns the number of tiles water can reach', () => {
    expect(solve1(lines)).toBe(57);
  });
});

describe('simulate', () => {
  it('updates the map with water', () => {
    const expectedMap = [
      ['.', '.', '.', '.', '.', '.', '+', '.', '.', '.', '.', '.', '.', '.',],
      ['.', '.', '.', '.', '.', '.', '|', '.', '.', '.', '.', '.', '#', '.',],
      ['.', '#', '.', '.', '#', '|', '|', '|', '|', '.', '.', '.', '#', '.',],
      ['.', '#', '.', '.', '#', '~', '~', '#', '|', '.', '.', '.', '.', '.',],
      ['.', '#', '.', '.', '#', '~', '~', '#', '|', '.', '.', '.', '.', '.',],
      ['.', '#', '~', '~', '~', '~', '~', '#', '|', '.', '.', '.', '.', '.',],
      ['.', '#', '~', '~', '~', '~', '~', '#', '|', '.', '.', '.', '.', '.',],
      ['.', '#', '#', '#', '#', '#', '#', '#', '|', '.', '.', '.', '.', '.',],
      ['.', '.', '.', '.', '.', '.', '.', '.', '|', '.', '.', '.', '.', '.',],
      ['.', '.', '.', '|', '|', '|', '|', '|', '|', '|', '|', '|', '.', '.',],
      ['.', '.', '.', '|', '#', '~', '~', '~', '~', '~', '#', '|', '.', '.',],
      ['.', '.', '.', '|', '#', '~', '~', '~', '~', '~', '#', '|', '.', '.',],
      ['.', '.', '.', '|', '#', '~', '~', '~', '~', '~', '#', '|', '.', '.',],
      ['.', '.', '.', '|', '#', '#', '#', '#', '#', '#', '#', '|', '.', '.',],
    ];
    expect(simulate(lines)).toEqual(expectedMap);
  });
});


describe('parseInput', () => {
  it('returns a 2d version of the input', () => {
    expect(parseInput(lines)).toEqual(map);
  });

  describe('parseVein', () => {
    it('returns an array with the coordinates of the vein', () => {
      expect(parseVein('x=495, y=2..7')).toEqual([
        {
          x: 495,
          y: 2,
        },
        {
          x: 495,
          y: 3,
        },
        {
          x: 495,
          y: 4,
        },
        {
          x: 495,
          y: 5,
        },
        {
          x: 495,
          y: 6,
        },
        {
          x: 495,
          y: 7,
        },
      ]);
    });

    it('accounts for the order of x and y', () => {
      expect(parseVein('y=7, x=495..501')).toEqual([
        {
          x: 495,
          y: 7,
        },
        {
          x: 496,
          y: 7,
        },
        {
          x: 497,
          y: 7,
        },
        {
          x: 498,
          y: 7,
        },
        {
          x: 499,
          y: 7,
        },
        {
          x: 500,
          y: 7,
        },
        {
          x: 501,
          y: 7,
        },
      ]);
    });
  });
});

describe('getCell', () => {
  it('returns the corresponding cell to a map', () => {
    expect(getCell(map, { x: 6, y: 0 })).toBe('+');
  });
})

describe('setCell', () => {
  it('updates the corresponding cell of a map', () => {
    const mapCopy = [...map.map(row => [...row])];

    setCell(mapCopy, { x: 1, y: 2 }, '*');
    expect(mapCopy[2][1]).toBe('*');
  });
})
