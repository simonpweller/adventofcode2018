const solve1 = require('./solve1');
const { parseInput, squarePower } = solve1;

describe('solve1', () => {
  it('returns the X,Y coordinate of the top-left fuel cell of the 3x3 square with the largest total power', () => {
    expect(solve1(['42'])).toBe('21,61');
    expect(solve1(['18'])).toBe('33,45');
  });
})

describe('squarePower', () => {
  it('calculates the power level in a given fuel cell', () => {
    expect(squarePower(3, 5, 8)).toBe(4);
    expect(squarePower(122, 79, 57)).toBe(-5);
    expect(squarePower(217, 196, 39)).toBe(0);
    expect(squarePower(101, 153, 71)).toBe(4);
  });
});

describe('parseInput', () => {
  it('parses the input', () => {
    expect(parseInput(['1133'])).toBe(1133);
  });
});