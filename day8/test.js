const solve1 = require('./solve1');

describe('solve1', () => {
  it('returns the sum of the metadata entries for a leaf node', () => {
    expect(solve1(['0 1 99'])).toBe(99);
  });

  it('sums up the total of multiple leaf nodes', () => {
    expect(solve1(['2 0 0 1 10 0 1 20'])).toBe(30);
  });

  it('returns the sum of the metadata entries for a root node and its children', () => {
    expect(solve1(['1 1 0 1 99 2'])).toBe(101);
  });

  it('works with multiple levels of nesting', () => {
    expect(solve1(['2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'])).toBe(138);
  });
});