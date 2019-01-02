const solve1 = require('./solve1');
const {parseNodes} = solve1;

describe('solve1', () => {
  it('returns the sum of the metadata entries for a leaf node', () => {
    expect(solve1(['0 1 99'])).toBe(99);
  });
  it('returns the sum of the metadata entries for a root node and its children', () => {
    expect(solve1(['1 1 0 1 99 2'])).toBe(101);
  });
})

describe('parseNodes', () => {
  it('parses a string of nodes into an array', () => {
    expect(parseNodes(['2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2']))
      .toEqual([2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2]);
  });
});