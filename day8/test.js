const solve1 = require('./solve1');
const solve2 = require('./solve2');

describe('solve2', () => {
  it('returns the sum of the metadata for a leaf node', () => {
    expect(solve2(['0 1 99'])).toBe(99);
    expect(solve2(['0 2 99 12'])).toBe(111);
  });

  it('returns the sum of the values of the childnodes referenced by 1-index in the metadata for a node with children', () => {
    expect(solve2(['2 2 0 1 10 0 1 20 1 2'])).toBe(30);
  });

  it('works with multiple levels of nesting', () => {
    expect(solve2(['2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2'])).toBe(66);
  });
});

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