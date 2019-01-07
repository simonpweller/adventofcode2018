const solve1 = require('./solve1');

const testInput = [
  'initial state: #..#.#..##......###...###',
  '',
  '...## => #',
  '..#.. => #',
  '.#... => #',
  '.#.#. => #',
  '.#.## => #',
  '.##.. => #',
  '.#### => #',
  '#.#.# => #',
  '#.### => #',
  '##.#. => #',
  '##.## => #',
  '###.. => #',
  '###.# => #',
  '####. => #',
];

describe('solve1', () => {
  it('simulates 20 generations and adds up all the numbers of plant-containing pots', () => {
    expect(solve1(testInput)).toBe(325);
  });
});