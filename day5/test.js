const solve1 = require('./solve1');
const solve2 = require('./solve2');

describe('solve1', () => {
  it(`
    reduces a line by continuously removing adjacent units where the letter is the same, but capitalization differs.
    Returns the number of remaining letters.
    `, () => {
    expect(solve1(['dabAcCaCBAcCcaDA'])).toBe(10);
  });
});

describe('solve2', () => {
  it(`
    removes one letter (both upper and lowercase instances) from the polymer and then fully reduces the polymer as per solve1.  
    Returns the number of remaining letters.
    The letter to be removed should be the one that results in the shortest final polymer.
    `, () => {
    expect(solve2(['dabAcCaCBAcCcaDA'])).toBe(4);
  });
});

