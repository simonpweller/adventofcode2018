const solve1 = require('./solve1');
const solve2 = require('./solve2');

describe('solve1', () => {
  it(`
    determines the area around each coordinate by counting the number of integer X,Y locations 
    that are closest to that coordinate (and aren't tied in distance to any other coordinate).
    Uses only the Manhattan distance.
    Returns the size of the largest area that isn't infinite
  `, () => {
    expect(solve1([
      '1, 1',
      '1, 6',
      '8, 3',
      '3, 4',
      '5, 5',
      '8, 9',
    ])).toBe(17);
  });
});

describe('solve2', () => {
  it('determines the number of coordinates with a total distance to all points below a threshold', () => {
    expect(solve2([
      '1, 1',
      '1, 6',
      '8, 3',
      '3, 4',
      '5, 5',
      '8, 9',
    ], 32)).toBe(16);
  });
})