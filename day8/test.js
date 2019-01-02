const solve1 = require('./solve1');
const { parseNodes, nodeLength } = solve1;

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

describe('nodeLength', () => {
  it('returns the number of elements in the first node', () => {
    expect(nodeLength([0, 1, 10, 0, 1, 20])).toBe(3);
  });

  it('includes the length of any child nodes of the first node', () => {
    expect(nodeLength([1, 1, 0, 1, 30, 10, 0, 1, 20])).toBe(6);
  });
});

describe('parseNodes', () => {
  it('parses a string of nodes into an array', () => {
    expect(parseNodes(['2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2']))
      .toEqual([2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2]);
  });
});