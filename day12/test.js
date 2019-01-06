const { parseInput, profile, step } = require('./utils');
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

describe('parseInput', () => {
  it('parses the initial state into an array of plant locations', () => {
    expect(parseInput(testInput).locations).toEqual(
      [0, 3, 5, 8, 9, 16, 17, 18, 22, 23, 24]
    );
  });

  it('parses the notes into an array of combinations that lead to a plant in the next generation', () => {
    expect(parseInput(testInput).notes).toEqual([
      '...##',
      '..#..',
      '.#...',
      '.#.#.',
      '.#.##',
      '.##..',
      '.####',
      '#.#.#',
      '#.###',
      '##.#.',
      '##.##',
      '###..',
      '###.#',
      '####.',
    ]);
  });
});

describe('step', () => {
  it('takes an initial state and a set of notes and returns the state of the next generation', () => {
    expect(step([0, 3, 5, 8, 9, 16, 17, 18, 22, 23, 24], [
      '...##',
      '..#..',
      '.#...',
      '.#.#.',
      '.#.##',
      '.##..',
      '.####',
      '#.#.#',
      '#.###',
      '##.#.',
      '##.##',
      '###..',
      '###.#',
      '####.',
    ])).toEqual([0, 4, 9, 15, 18, 21, 24]);
  });
});

describe('profile', () => {
  it('takes an initial state and an index and returns the profile at that index', () => {
    expect(profile([0, 3, 5, 8, 9, 16, 17, 18, 22, 23, 24], 0)).toEqual('..#..');
    expect(profile([0, 3, 5, 8, 9, 16, 17, 18, 22, 23, 24], 18)).toEqual('###..');
    expect(profile([0, 3, 5, 8, 9, 16, 17, 18, 22, 23, 24], 30)).toEqual('.....');
  });
});