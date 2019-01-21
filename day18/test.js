const { parseInput, transitionMap, adjacentTrees, adjacentLumber, adjacentOpen, adjacentFields, transitionField } = require('./utils');
const solve1 = require('./solve1');

describe('solve1', () => {
  it('returns the total resource value of the lumber collection area after 10 minutes?', () => {
    const lines = [
      '.#.#...|#.',
      '.....#|##|',
      '.|..|...#.',
      '..|#.....#',
      '#.#|||#|#|',
      '...#.||...',
      '.|....|...',
      '||...#|.#|',
      '|.||||..|.',
      '...#.|..|.',
    ];

    expect(solve1(lines)).toBe(1147);
  });
});

describe('transitionMap', () => {
  const initialState = [
    ['.', '#', '.', '#', '.', '.', '.', '|', '#', '.'],
    ['.', '.', '.', '.', '.', '#', '|', '#', '#', '|'],
    ['.', '|', '.', '.', '|', '.', '.', '.', '#', '.'],
    ['.', '.', '|', '#', '.', '.', '.', '.', '.', '#'],
    ['#', '.', '#', '|', '|', '|', '#', '|', '#', '|'],
    ['.', '.', '.', '#', '.', '|', '|', '.', '.', '.'],
    ['.', '|', '.', '.', '.', '.', '|', '.', '.', '.'],
    ['|', '|', '.', '.', '.', '#', '|', '.', '#', '|'],
    ['|', '.', '|', '|', '|', '|', '.', '.', '|', '.'],
    ['.', '.', '.', '#', '.', '|', '.', '.', '|', '.'],
  ];

  it('updates all acres simulatenously', () => {

    const expectedState = [
      ['.', '.', '.', '.', '.', '.', '.', '#', '#', '.'],
      ['.', '.', '.', '.', '.', '.', '|', '#', '#', '#'],
      ['.', '|', '.', '.', '|', '.', '.', '.', '#', '.'],
      ['.', '.', '|', '#', '|', '|', '.', '.', '.', '#'],
      ['.', '.', '#', '#', '|', '|', '.', '|', '#', '|'],
      ['.', '.', '.', '#', '|', '|', '|', '|', '.', '.'],
      ['|', '|', '.', '.', '.', '|', '|', '|', '.', '.'],
      ['|', '|', '|', '|', '|', '.', '|', '|', '.', '|'],
      ['|', '|', '|', '|', '|', '|', '|', '|', '|', '|'],
      ['.', '.', '.', '.', '|', '|', '.', '.', '|', '.'],
    ];

    expect(transitionMap(initialState)).toEqual(expectedState);
  });
});

describe('transitionField', () => {
  describe('An open acre', () => {
    it('will become filled with trees if three or more adjacent acres contained trees.', () => {
      const map = [
        ['|', '.', '.'],
        ['|', '.', '.'],
        ['|', '.', '.'],
      ];

      expect(transitionField(map, { x: 1, y: 1 })).toBe('|');
    });

    it('will stay an open acre if less than three adjacent acres contained trees.', () => {
      const map = [
        ['.', '.', '.'],
        ['|', '.', '.'],
        ['|', '.', '.'],
      ];

      expect(transitionField(map, { x: 1, y: 1 })).toBe('.');
    });
  });


  describe('An acre filled with trees', () => {
    it('will become a lumberyard if three or more adjacent acres were lumberyards.', () => {
      const map = [
        ['.', '.', '#'],
        ['.', '|', '#'],
        ['.', '.', '#'],
      ];

      expect(transitionField(map, { x: 1, y: 1 })).toBe('#');
    });

    it('will stay filled with trees if less than three adjacent acres were lumberyards.', () => {
      const map = [
        ['.', '.', '#'],
        ['.', '|', '|'],
        ['.', '.', '#'],
      ];

      expect(transitionField(map, { x: 1, y: 1 })).toBe('|');
    });
  });

  describe('An acre containing a lumberyard', () => {
    it('will remain a lumberyard if it was adjacent to at least one other lumberyard and at least one acre containing trees.', () => {
      const map = [
        ['.', '.', '#'],
        ['.', '#', '|'],
        ['.', '.', '#'],
      ];
      expect(transitionField(map, { x: 1, y: 1 })).toBe('#');
    });

    it('will become open if there is not at least one lumber yard and one area containing trees adjacent', () => {
      const noLumber = [
        ['.', '.', '|'],
        ['.', '#', '|'],
        ['.', '.', '|'],
      ];
      expect(transitionField(noLumber, { x: 1, y: 1 })).toBe('.');

      const noTrees = [
        ['.', '.', '#'],
        ['.', '#', '#'],
        ['.', '.', '#'],
      ];
      expect(transitionField(noTrees, { x: 1, y: 1 })).toBe('.');
    });
  });
});


describe('adjacentTrees', () => {
  it('returns the number of adjacent fields containing trees', () => {
    const noTrees = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];

    expect(adjacentTrees(noTrees, { x: 1, y: 1 })).toBe(0);

    const allTrees = [
      ['|', '|', '|'],
      ['|', '|', '|'],
      ['|', '|', '|'],
    ];

    expect(adjacentTrees(allTrees, { x: 1, y: 1 })).toBe(8);
  });
});

describe('adjacentLumber', () => {
  it('returns the number of adjacent fields containing lumber yards', () => {
    const noLumber = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];

    expect(adjacentLumber(noLumber, { x: 1, y: 1 })).toBe(0);

    const allLumber = [
      ['#', '#', '#'],
      ['#', '#', '#'],
      ['#', '#', '#'],
    ];

    expect(adjacentLumber(allLumber, { x: 1, y: 1 })).toBe(8);
  });
});

describe('adjacentOpen', () => {
  it('returns the number of adjacent fields that are open', () => {
    const allOpen = [
      ['.', '.', '.'],
      ['.', '.', '.'],
      ['.', '.', '.'],
    ];

    expect(adjacentOpen(allOpen, { x: 1, y: 1 })).toBe(8);

    const allLumber = [
      ['#', '#', '#'],
      ['#', '#', '#'],
      ['#', '#', '#'],
    ];

    expect(adjacentOpen(allLumber, { x: 1, y: 1 })).toBe(0);
  });
});

describe('adjacentFields', () => {
  it('returns an array of adjacent fields', () => {
    const map = [
      ['.', '#', '|'],
      ['|', '.', '#'],
      ['.', '#', '.'],
    ];

    expect(adjacentFields(map, { x: 1, y: 1 })).toEqual(['.', '#', '|', '|', '#', '.', '#', '.']);
    expect(adjacentFields(map, { x: 0, y: 1 })).toEqual(['.', '#', '.', '.', '#']);
    expect(adjacentFields(map, { x: 1, y: 2 })).toEqual(['|', '.', '#', '.', '.']);
  });
});


describe('parseInput', () => {
  it('parses the input into a nested array', () => {
    const lines = [
      '.#.#...|#.',
      '.....#|##|',
      '.|..|...#.',
      '..|#.....#',
      '#.#|||#|#|',
      '...#.||...',
      '.|....|...',
      '||...#|.#|',
      '|.||||..|.',
      '...#.|..|.',
    ];

    const expectedMap = [
      ['.', '#', '.', '#', '.', '.', '.', '|', '#', '.'],
      ['.', '.', '.', '.', '.', '#', '|', '#', '#', '|'],
      ['.', '|', '.', '.', '|', '.', '.', '.', '#', '.'],
      ['.', '.', '|', '#', '.', '.', '.', '.', '.', '#'],
      ['#', '.', '#', '|', '|', '|', '#', '|', '#', '|'],
      ['.', '.', '.', '#', '.', '|', '|', '.', '.', '.'],
      ['.', '|', '.', '.', '.', '.', '|', '.', '.', '.'],
      ['|', '|', '.', '.', '.', '#', '|', '.', '#', '|'],
      ['|', '.', '|', '|', '|', '|', '.', '.', '|', '.'],
      ['.', '.', '.', '#', '.', '|', '.', '.', '|', '.'],
    ];

    expect(parseInput(lines)).toEqual(expectedMap);
  });
});
