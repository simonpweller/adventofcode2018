const { parseInput, findNearestTargets } = require('./utils');

const sampleInput = [
  '#######',
  '#E..G.#',
  '#...#.#',
  '#.G.#G#',
  '#######',
];

describe('parseInput', () => {
  it('parses the input into a nested array called map', () => {
    expect(parseInput(sampleInput).map).toEqual([
      ['#', '#', '#', '#', '#', '#', '#'],
      ['#', 'E', '.', '.', 'G', '.', '#'],
      ['#', '.', '.', '.', '#', '.', '#'],
      ['#', '.', 'G', '.', '#', 'G', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ]);
  });

  it('includes the location of each Goblin in an array called goblins', () => {
    expect(parseInput(sampleInput).goblins).toEqual([
      {
        x: 4,
        y: 1,
      }, {
        x: 2,
        y: 3,
      }, {
        x: 5,
        y: 3,
      }
    ]);
  });

  it('includes the location of each Elf in an array called elves', () => {
    expect(parseInput(sampleInput).elves).toEqual([
      {
        x: 1,
        y: 1,
      }
    ]);
  });
});

describe('findNearestTargets', () => {
  it('returns an array of all squares in range of an enemy that can be reached in the fewest steps', () => {
    expect(findNearestTargets({
      x: 1,
      y: 1,
      type: 'E',
    }, parseInput(sampleInput).map)).toEqual([
      {
        x: 3,
        y: 1,
      },
      {
        x: 2,
        y: 2,
      }, {
        x: 1,
        y: 3,
      }
    ]);
  });
});
