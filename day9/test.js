const solve1 = require('./solve1');
const { parseInput, playGame } = solve1;

describe('solve1', () => {
  it('works for a simple example', () => {
    expect(solve1(['9 players; last marble is worth 25 points'])).toBe(32);
  });

  it('works for more complex examples', () => {
    expect(solve1(['10 players; last marble is worth 1618 points'])).toBe(8317);
    expect(solve1(['13 players; last marble is worth 7999 points'])).toBe(146373);
    expect(solve1(['17 players; last marble is worth 1104 points'])).toBe(2764);
    expect(solve1(['21 players; last marble is worth 6111 points'])).toBe(54718);
    expect(solve1(['30 players; last marble is worth 5807 points'])).toBe(37305);
  });
});

describe('playGame', () => {
  it('initializes with a 0-marble', () => {
    const game = playGame();
    expect(game.circle).toEqual([0]);
  });

  it('inserts the next marble at position 1 if the current marble is the last', () => {
    const game1 = playGame(1);
    expect(game1.circle).toEqual([0, 1]);

    const game2 = playGame(2);
    expect(game2.circle).toEqual([0, 2, 1]);

    const game4 = playGame(4);
    expect(game4.circle).toEqual([0, 4, 2, 1, 3]);
  });

  it('inserts the next marble at the end if there is one marble after the current marble', () => {
    const game3 = playGame(3);
    expect(game3.circle).toEqual([0, 2, 1, 3]);
  });

  it('inserts the next marble at currentMarbleIndex + 2 if there is more than one marble after the current one', () => {
    const game5 = playGame(5);
    expect(game5.circle).toEqual([0, 4, 2, 5, 1, 3]);
  });

  it('continues based on these rules up to 22', () => {
    const game22 = playGame(22);
    expect(game22.circle).toEqual([0, 16, 8, 17, 4, 18, 9, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15]);
  });

  describe('current player', () => {
    it('keeps track of the current player', () => {
      const game1 = playGame(1);
      expect(game1.currentPlayer).toEqual(1);
    });

    it('circles back around after everybody has had a turn', () => {
      const game3 = playGame(3, 2);
      expect(game3.currentPlayer).toEqual(1);
    });
  });

  describe('if the current turn is divisible by 23', () => {
    it('instead removes the marble 7 marbles counterclockwise from the current marble', () => {
      const game22 = playGame(23);
      expect(game22.circle).toEqual([0, 16, 8, 17, 4, 18, 19, 2, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15]);
    });

    it('makes the marble located immediately clockwise of the marble that was removed the new current marble', () => {
      const game24 = playGame(24);
      expect(game24.circle).toEqual([0, 16, 8, 17, 4, 18, 19, 2, 24, 20, 10, 21, 5, 22, 11, 1, 12, 6, 13, 3, 14, 7, 15]);
    });

    it('adds the value of the turn and the value of the removed marble to the players score', () => {
      const game23 = playGame(23, 9);
      expect(game23.scores).toEqual({
        '5': 32,
      });
    });
  });
});

describe('parseInput', () => {
  it('extracts the number of players and the value of the last marble', () => {
    expect(parseInput(['9 players; last marble is worth 25 points'])).toEqual({
      players: 9,
      lastMarble: 25,
    });
  });
});