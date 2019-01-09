const { parseInput, sortCarts, headedTo, move, cross } = require('./utils');
const solve1 = require('./solve1');
const solve2 = require('./solve2');

const input = [
  '/->-\\        ',
  '|   |  /----\\',
  '| /-+--+-\\  |',
  '| | |  | v  |',
  '\\-+-/  \\-+--/',
  '  \\------/   ',
];

describe('parseInput', () => {

  it('parses the input and returns a map with the carts replaced with pieces of track', () => {
    expect(parseInput(input).map).toEqual([
      '/---\\        ',
      '|   |  /----\\',
      '| /-+--+-\\  |',
      '| | |  | |  |',
      '\\-+-/  \\-+--/',
      '  \\------/   ',
    ]);
  });

  it('stores the location and direction of each cart', () => {
    expect(parseInput(input).carts).toEqual([
      {
        x: 2,
        y: 0,
        facing: 'right',
        nextTurn: 'left',
      }, {
        x: 9,
        y: 3,
        facing: 'down',
        nextTurn: 'left',
      }
    ]);
  });
});

describe('sortCarts', () => {
  it('sorts the carts by x coordinates', () => {
    expect(sortCarts([
      {
        x: 2,
        y: 1,
      },
      {
        x: 1,
        y: 2,
      },
    ])).toEqual(
      [
        {
          x: 1,
          y: 2,
        },
        {
          x: 2,
          y: 1,
        },
      ]
    );
  });

  it('sorts the carts by y coordinates if they have the same x coordinate', () => {
    expect(sortCarts([
      {
        x: 2,
        y: 1,
      },
      {
        x: 1,
        y: 3,
      },
      {
        x: 1,
        y: 2,
      },
    ])).toEqual(
      [
        {
          x: 1,
          y: 2,
        },
        {
          x: 1,
          y: 3,
        },
        {
          x: 2,
          y: 1,
        },
      ]
    );
  });
});

describe('headedTo', () => {
  const cart = {
    x: 1,
    y: 1,
  };

  it('returns the coordinates of the cell a cart is headed to', () => {
    expect(headedTo({ ...cart, facing: 'left' })).toEqual({ x: 0, y: 1 });
    expect(headedTo({ ...cart, facing: 'right' })).toEqual({ x: 2, y: 1 });
    expect(headedTo({ ...cart, facing: 'up' })).toEqual({ x: 1, y: 0 });
    expect(headedTo({ ...cart, facing: 'down' })).toEqual({ x: 1, y: 2 });
  });
});

describe('move', () => {
  const cart = {
    x: 0,
    y: 0,
    facing: 'right',
    nextTurn: 'left',
  };

  it('takes in a cart and a target and returns a new cart with its position and direction updated', () => {
    expect(move({ ...cart, facing: 'right' }, '-')).toEqual({ ...cart, x: 1, facing: 'right' });
    expect(move({ ...cart, facing: 'right' }, '\\')).toEqual({ ...cart, x: 1, facing: 'down' });
    expect(move({ ...cart, facing: 'right' }, '/')).toEqual({ ...cart, x: 1, facing: 'up' });

    expect(move({ ...cart, facing: 'left' }, '-')).toEqual({ ...cart, x: -1, facing: 'left' });
    expect(move({ ...cart, facing: 'left' }, '\\')).toEqual({ ...cart, x: -1, facing: 'up' });
    expect(move({ ...cart, facing: 'left' }, '/')).toEqual({ ...cart, x: -1, facing: 'down' });

    expect(move({ ...cart, facing: 'up' }, '|')).toEqual({ ...cart, y: -1, facing: 'up' });
    expect(move({ ...cart, facing: 'up' }, '\\')).toEqual({ ...cart, y: -1, facing: 'left' });
    expect(move({ ...cart, facing: 'up' }, '/')).toEqual({ ...cart, y: -1, facing: 'right' });

    expect(move({ ...cart, facing: 'down' }, '|')).toEqual({ ...cart, y: 1, facing: 'down' });
    expect(move({ ...cart, facing: 'down' }, '\\')).toEqual({ ...cart, y: 1, facing: 'right' });
    expect(move({ ...cart, facing: 'down' }, '/')).toEqual({ ...cart, y: 1, facing: 'left' });
  });

  it('turns a car left the first time it hits an intersection', () => {
    expect(move({ ...cart, facing: 'up' }, '+').facing).toBe('left');
    expect(move({ ...cart, facing: 'right' }, '+').facing).toBe('up');
  });

  it('updates the next turn property of a cart when it hits an intersection', () => {
    expect(move(cart, '+').nextTurn).toBe('straight');
    expect(move({ ...cart, nextTurn: 'straight' }, '+').nextTurn).toBe('right');
    expect(move({ ...cart, nextTurn: 'right' }, '+').nextTurn).toBe('left');
  });

  it('changes the turn direction based on the nextTurn property', () => {
    expect(move({ ...cart, facing: 'up', nextTurn: 'straight' }, '+').facing).toBe('up');
    expect(move({ ...cart, facing: 'up', nextTurn: 'right' }, '+').facing).toBe('right');
  });
});

describe('cross', () => {
  it('takes in a facing direction and a turn behaviour and returns the new facing direction', () => {
    expect(cross('up', 'left')).toBe('left');
    expect(cross('up', 'straight')).toBe('up');
    expect(cross('up', 'right')).toBe('right');

    expect(cross('down', 'left')).toBe('right');
    expect(cross('down', 'straight')).toBe('down');
    expect(cross('down', 'right')).toBe('left');

    expect(cross('left', 'left')).toBe('down');
    expect(cross('left', 'straight')).toBe('left');
    expect(cross('left', 'right')).toBe('up');

    expect(cross('right', 'left')).toBe('up');
    expect(cross('right', 'straight')).toBe('right');
    expect(cross('right', 'right')).toBe('down');
  });
});

describe('solve1', () => {
  it('returns the location of the crash if two carts crash', () => {
    expect(solve1(['|', '|', '|', 'v', '^', '|', '|'])).toEqual({ x: 0, y: 4 });
    expect(solve1(['|', '|', 'v', '|', '^', '|', '|'])).toEqual({ x: 0, y: 3 });
    expect(solve1(input)).toEqual({ x: 7, y: 3 })
  });
});

describe('solve2', () => {
  it(`returns the location of the last cart that hasn't crashed`, () => {
    expect(solve2([
      '/>-<\\  ',
      '|   |  ',
      '| /<+-\\',
      '| | | v',
      '\\>+</ |',
      '  |   ^',
      '  \\<->/',
    ])).toEqual({ x: 6, y: 4 });
  });
});
