const solve1 = require('./solve1');

it('solves part 1', () => {
  expect(solve1([
    '#1 @ 1,3: 4x4',
    '#2 @ 3,1: 4x4',
    '#3 @ 5,5: 2x2',
  ])).toBe(4);
});