const { parseInput, findNearestTargets, selectTarget, readingOrder, chooseStep } = require('./utils');

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

describe('readingOrder comparison function', () => {
  const a = {
    x: 1,
    y: 1,
  }

  const b = {
    x: 0,
    y: 2,
  }

  const c = {
    x: 0,
    y: 1,
  }

  it('sorts first on the y axis', () => {
    expect(readingOrder(a, b)).toBe(-1);
    expect(readingOrder(b, a)).toBe(1);
  });

  it('sorts on the x axis if there is a tie on the y axis', () => {
    expect(readingOrder(a, c)).toBe(1);
    expect(readingOrder(c, a)).toBe(-1);
  });
});

describe('findNearestTargets', () => {
  it('returns an array of all squares in range of an enemy that can be reached in the fewest steps', () => {
    expect(findNearestTargets({
      x: 3,
      y: 1,
      type: 'G',
    }, parseInput(sampleInput).map)).toEqual([
      {
        x: 2,
        y: 1,
      },
    ]);
  });

  it('adjusts the target type based on the type of the actor', () => {
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

describe('selectTarget', () => {
  it('returns the square a unit will move to', () => {
    expect(selectTarget({
      x: 1,
      y: 1,
      type: 'E',
    }, parseInput(sampleInput).map)).toEqual({
      x: 3,
      y: 1,
    });
  });
});