const solve1 = require('./solve1');
const { parseInput, steps, nRecipes } = require('./utils');

describe('parseInput', () => {
  it('returns the puzzle input', () => {
    expect(parseInput(['864801'])).toBe(864801);
  });
});

describe('steps', () => {
  it('returns an object with a property scores - an array of the initial recipe scores, 3 and 7', () => {
    expect(steps().scores).toEqual([3, 7]);
  });

  it('returns an object with a property positions with the positions of elves 1 and two (initially 0 and 1)', () => {
    expect(steps().positions).toEqual([0, 1]);
  });

  describe('first turn', () => {
    it('adds new recipes', () => {
      // To create new recipes, the two Elves combine their current recipes. 
      // This creates new recipes from the digits of the sum of the current recipes' scores. 
      // With the current recipes' scores of 3 and 7, their sum is 10, and so two new recipes would be created:
      //  the first with score 1 and the second with score 0.
      expect(steps(1).scores).toEqual([3, 7, 1, 0]);
    });
  });

  describe('second turn', () => {
    it('adds new recipes', () => {
      expect(steps(2).scores).toEqual([3, 7, 1, 0, 1, 0]);
    });

    it('updates the position of the elves', () => {
      // To do this, the Elf steps forward through the scoreboard a number of recipes equal to 1 plus the score of their current recipe. 
      // If they run out of recipes, they loop back around to the beginning.
      expect(steps(1).positions).toEqual([0, 1]);
      expect(steps(2).positions).toEqual([4, 3]);
    });
  });

  describe('fifth turn', () => {
    it('adds new recipes', () => {
      expect(steps(5).scores).toEqual([3, 7, 1, 0, 1, 0, 1, 2, 4]);
    });

    it('updates the position of the elves', () => {
      expect(steps(5).positions).toEqual([4, 8]);
    });
  });
});

describe('nRecipes', () => {
  it('returns the first nRecipes', () => {
    expect(nRecipes(2)).toEqual([3, 7]);
    expect(nRecipes(3)).toEqual([3, 7, 1]);
    expect(nRecipes(4)).toEqual([3, 7, 1, 0]);
  });
});

describe('solve1', () => {
  it('the scores of the ten recipes after the first x on the scoreboard', () => {
    expect(solve1(['9'])).toBe('5158916779');
    expect(solve1(['5'])).toBe('0124515891');
    expect(solve1(['18'])).toBe('9251071085');
    expect(solve1(['2018'])).toBe('5941429882');
  });
});