const { parseInput, findNearestTargets, selectTarget, readingOrder, chooseStep, takeTurns, getAttackTarget } = require('./utils');
const solve1 = require('./solve1');

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

  it('includes the location of each actor in an array, initialized with 200 hit points', () => {
    expect(parseInput(sampleInput).actors).toEqual([
      {
        x: 1,
        y: 1,
        hitPoints: 200,
        type: 'E',
      }, {
        x: 4,
        y: 1,
        hitPoints: 200,
        type: 'G',
      }, {
        x: 2,
        y: 3,
        hitPoints: 200,
        type: 'G',
      }, {
        x: 5,
        y: 3,
        hitPoints: 200,
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

  it('works for a more complex map', () => {
    const map = [
      '#########',
      '#G..G..G#',
      '#.......#',
      '#.......#',
      '#G..E..G#',
      '#.......#',
      '#.......#',
      '#G..G..G#',
      '#########',
    ];

    const parsedMap = parseInput(map).map;
    const actor = {
      x: 1,
      y: 1,
      type: 'G',
    };

    expect(selectTarget(actor, map)).toEqual({
      x: 4,
      y: 3,
    });
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

  it('works for a more complex map', () => {
    const map = [
      '#########',
      '#G..G..G#',
      '#.......#',
      '#.......#',
      '#G..E..G#',
      '#.......#',
      '#.......#',
      '#G..G..G#',
      '#########',
    ];

    const parsedMap = parseInput(map).map;
    const actor = {
      x: 1,
      y: 1,
      type: 'G',
    }

    expect(chooseStep(actor, map)).toEqual({
      x: 2,
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

  it('returns null if an enemy is already in range', () => {
    const enemyInRangeMap = [
      '#######',
      '#G.EG.#',
      '#######',
    ];

    expect(chooseStep({
      x: 3,
      y: 1,
      type: 'E',
    }, parseInput(enemyInRangeMap).map)).toBe(null);
  });
});

describe('getAttackTarget', () => {
  it('returns the unit that will be attacked by an actor', () => {
    const simpleMap = [
      '#######',
      '#G.EG.#',
      '#######',
    ];

    const { actors, map } = parseInput(simpleMap);
    const [goblin1, elf, goblin2] = actors;

    expect(getAttackTarget(elf, map, actors)).toEqual(goblin2);
  });

  it('returns null if there is nothing to attack', () => {
    const outOfRangeMap = [
      '#######',
      '#G.E.G#',
      '#######',
    ];

    const { actors, map } = parseInput(outOfRangeMap);
    const [goblin1, elf, goblin2] = actors;

    expect(getAttackTarget(elf, map, actors)).toEqual(null);
  });

  it('returns the unit with the fewest hitpoints if there are multiple adjacent targets', () => {
    const tiedMap = [
      '#######',
      '#.GEG.#',
      '#######',
    ];

    const { actors, map } = parseInput(tiedMap);
    const [goblin1, elf, goblin2] = actors;
    goblin2.hitPoints--;

    expect(getAttackTarget(elf, map, actors)).toBe(goblin2);
  });

  it('returns the unit first in reading order if there is a tie for lowest number of hitpoints', () => {
    const tiedMap = [
      '#######',
      '#.GEG.#',
      '#######',
    ];

    const { actors, map } = parseInput(tiedMap);
    const [goblin1, elf, goblin2] = actors;

    expect(getAttackTarget(elf, map, actors)).toBe(goblin1);
    expect(getAttackTarget(elf, map, actors.reverse())).toBe(goblin1);
  });
});


describe('takeTurns', () => {
  const movementMap = [
    '#########',
    '#G..G..G#',
    '#.......#',
    '#.......#',
    '#G..E..G#',
    '#.......#',
    '#.......#',
    '#G..G..G#',
    '#########',
  ];

  it('advances the passed in map by a set number of turns and returns the new state', () => {
    expect(takeTurns(movementMap, 1).map).toEqual([
      '#########',
      '#.G...G.#',
      '#...G...#',
      '#...E..G#',
      '#.G.....#',
      '#.......#',
      '#G..G..G#',
      '#.......#',
      '#########',
    ]);
  });

  it('works for multiple turns', () => {
    expect(takeTurns(movementMap, 3).map).toEqual([
      '#########',
      '#.......#',
      '#..GGG..#',
      '#..GEG..#',
      '#G..G...#',
      '#......G#',
      '#.......#',
      '#.......#',
      '#########',
    ]);
  });

  const combatMap = [
    '#######',
    '#.G...#',
    '#...EG#',
    '#.#.#G#',
    '#..G#E#',
    '#.....#',
    '#######',
  ];

  it('returns the actors', () => {
    expect(takeTurns(combatMap, 0).actors).toEqual([
      { "hitPoints": 200, "type": "G", "x": 2, "y": 1 },
      { "hitPoints": 200, "type": "E", "x": 4, "y": 2 },
      { "hitPoints": 200, "type": "G", "x": 5, "y": 2 },
      { "hitPoints": 200, "type": "G", "x": 5, "y": 3 },
      { "hitPoints": 200, "type": "G", "x": 3, "y": 4 },
      { "hitPoints": 200, "type": "E", "x": 5, "y": 4 }
    ]);
  });

  it('updates their hitpoints based on combat action', () => {
    const { actors } = takeTurns(combatMap, 1);
    expect(actors[0].hitPoints).toBe(200);
    expect(actors[1].hitPoints).toBe(197);
    expect(actors[2].hitPoints).toBe(197);
    expect(actors[3].hitPoints).toBe(200);
    expect(actors[4].hitPoints).toBe(197);
    expect(actors[5].hitPoints).toBe(197);
  });

  it('works for multiple rounds', () => {
    const { actors } = takeTurns(combatMap, 2);
    expect(actors[0].hitPoints).toBe(200);
    expect(actors[1].hitPoints).toBe(200);
    expect(actors[2].hitPoints).toBe(188);
    expect(actors[3].hitPoints).toBe(194);
    expect(actors[4].hitPoints).toBe(194);
    expect(actors[5].hitPoints).toBe(194);
  });

  it('removes an actor if its hitpoints go to 0 or below ', () => {
    const { actors: actorsAfter23 } = takeTurns(combatMap, 23);
    expect(actorsAfter23[0].hitPoints).toBe(200);
    expect(actorsAfter23[1].hitPoints).toBe(200);
    expect(actorsAfter23[2].hitPoints).toBe(131);
    expect(actorsAfter23[3].hitPoints).toBe(131);
    expect(actorsAfter23[4].hitPoints).toBe(131);

    const { actors: actorsAfter47 } = takeTurns(combatMap, 47);
    expect(actorsAfter47[0].hitPoints).toBe(200);
    expect(actorsAfter47[1].hitPoints).toBe(131);
    expect(actorsAfter47[2].hitPoints).toBe(59);
    expect(actorsAfter47[3].hitPoints).toBe(200);
  });
});

describe('solve1', () => {
  it('returns the battle outcome (number of completed rounds * hit points of remaining units)', () => {
    const map1 = [
      '#######',
      '#.G...#',
      '#...EG#',
      '#.#.#G#',
      '#..G#E#',
      '#.....#',
      '#######',
    ];

    expect(solve1(map1)).toBe(27730);

    const map2 = [
      '#######',
      '#G..#E#',
      '#E#E.E#',
      '#G.##.#',
      '#...#E#',
      '#...E.#',
      '#######',
    ];

    expect(solve1(map2)).toBe(36334);

    const map3 = [
      '#######',
      '#E..EG#',
      '#.#G.E#',
      '#E.##E#',
      '#G..#.#',
      '#..E#.#',
      '#######',
    ];

    expect(solve1(map3)).toBe(39514);

    const map4 = [
      '#######',
      '#E.G#.#',
      '#.#G..#',
      '#G.#.G#',
      '#G..#.#',
      '#...E.#',
      '#######',
    ];

    expect(solve1(map4)).toBe(27755);


  });
});