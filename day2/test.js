const solve1 = require('./solve1');
const solve2 = require('./solve2');

it('solves part 1', () => {
  expect(solve1([
    'abcdef',
    'bababc',
    'abbcde',
    'abcccd',
    'aabcdd',
    'abcdee',
    'ababab',
  ])).toBe(12);
});

it('solves part 2', () => {
  expect(solve2([
    'abcde',
    'fghij',
    'klmno',
    'pqrst',
    'fguij',
    'axcye',
    'wvxyz',
  ])).toBe('fgij');
});