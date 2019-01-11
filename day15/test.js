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

  it('includes the location of each actor in an array', () => {
    expect(parseInput(sampleInput).actors).toEqual([
      {
        x: 1,
        y: 1,
        type: 'E',
      }, {
        x: 4,
        y: 1,
        type: 'G',
      }, {
        x: 2,
        y: 3,
        type: 'G',
      }, {
        x: 5,
        y: 3,
        type: 'G',
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

  it('returns null if there is nowhere to go', () => {
    const emptyMap = [
      '#######',
      '#E....#',
      '#.....#',
      '#.....#',
      '#######',
    ];

    expect(selectTarget({
      x: 1,
      y: 1,
      type: 'E',
    }, parseInput(emptyMap).map)).toBe(null);
  });
});

describe('chooseStep', () => {
  it('returns the step a unit can take that will get it closes to its destination', () => {
    const map = [
      ['#', '#', '#', '#', '#', '#', '#',],
      ['#', '.', 'E', '.', '.', 'G', '#',],
      ['#', '#', '#', '#', '#', '#', '#',],
    ];

    const actor = {
      x: 2,
      y: 1,
      type: 'E',
    }

    expect(chooseStep(actor, map)).toEqual({
      x: 3,
      y: 1,
    });
  });

  it('chooses the first step in reading order if there is more than one option', () => {
    const map = [
      ['#', '#', '#', '#', '#', '#', '#'],
      ['#', '.', 'E', '.', '.', '.', '#'],
      ['#', '.', '.', '.', '.', '.', '#'],
      ['#', '.', '.', '.', 'G', '.', '#'],
      ['#', '#', '#', '#', '#', '#', '#'],
    ];

    const actor = {
      x: 2,
      y: 1,
      type: 'E',
    }

    expect(chooseStep(actor, map)).toEqual({
      x: 3,
      y: 1,
    });
  });

  it('returns null if there is nowhere to go', () => {
    const emptyMap = [
      '#######',
      '#E....#',
      '#.....#',
      '#.....#',
      '#######',
    ];

    expect(chooseStep({
      x: 1,
      y: 1,
      type: 'E',
    }, parseInput(emptyMap).map)).toBe(null);
  });
});