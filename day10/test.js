const solve1 = require('./solve1');
const { parseInput } = solve1;
const solve2 = require('./solve2');

const input = [
  'position=< 9,  1> velocity=< 0,  2>',
  'position=< 7,  0> velocity=<-1,  0>',
  'position=< 3, -2> velocity=<-1,  1>',
  'position=< 6, 10> velocity=<-2, -1>',
  'position=< 2, -4> velocity=< 2,  2>',
  'position=<-6, 10> velocity=< 2, -2>',
  'position=< 1,  8> velocity=< 1, -1>',
  'position=< 1,  7> velocity=< 1,  0>',
  'position=<-3, 11> velocity=< 1, -2>',
  'position=< 7,  6> velocity=<-1, -1>',
  'position=<-2,  3> velocity=< 1,  0>',
  'position=<-4,  3> velocity=< 2,  0>',
  'position=<10, -3> velocity=<-1,  1>',
  'position=< 5, 11> velocity=< 1, -2>',
  'position=< 4,  7> velocity=< 0, -1>',
  'position=< 8, -2> velocity=< 0,  1>',
  'position=<15,  0> velocity=<-2,  0>',
  'position=< 1,  6> velocity=< 1,  0>',
  'position=< 8,  9> velocity=< 0, -1>',
  'position=< 3,  3> velocity=<-1,  1>',
  'position=< 0,  5> velocity=< 0, -1>',
  'position=<-2,  2> velocity=< 2,  0>',
  'position=< 5, -2> velocity=< 1,  2>',
  'position=< 1,  4> velocity=< 2,  1>',
  'position=<-2,  7> velocity=< 2, -2>',
  'position=< 3,  6> velocity=<-1, -1>',
  'position=< 5,  0> velocity=< 1,  0>',
  'position=<-6,  0> velocity=< 2,  0>',
  'position=< 5,  9> velocity=< 1, -2>',
  'position=<14,  7> velocity=<-2,  0>',
  'position=<-3,  6> velocity=< 2, -1>',
];

describe('solve1', () => {
  it('returns a nested array that can be used to visualize the current location of the points', () => {
    expect(solve1(input, 0))
      .toEqual([
        '........#.............',
        '................#.....',
        '.........#.#..#.......',
        '......................',
        '#..........#.#.......#',
        '...............#......',
        '....#.................',
        '..#.#....#............',
        '.......#..............',
        '......#...............',
        '...#...#.#...#........',
        '....#..#..#.........#.',
        '.......#..............',
        '...........#..#.......',
        '#...........#.........',
        '...#.......#..........',
      ]);
  });

  it('advances a set number of seconds if a second argument is passed in', () => {
    expect(solve1(input, 3))
      .toEqual([
        '#...#..###',
        '#...#...#.',
        '#...#...#.',
        '#####...#.',
        '#...#...#.',
        '#...#...#.',
        '#...#...#.',
        '#...#..###',
      ]);
  });

  it('advances until alignment is reached if no second argument is passed in', () => {
    expect(solve1(input))
      .toEqual([
        '#...#..###',
        '#...#...#.',
        '#...#...#.',
        '#####...#.',
        '#...#...#.',
        '#...#...#.',
        '#...#...#.',
        '#...#..###',
      ]);
  });
});

describe('solve2', () => {
  it('returns the number of seconds until alignment is reached', () => {
    expect(solve2(input))
      .toEqual(3);
  });
});

describe('parseInput', () => {
  it('extracts position and velocity for each point', () => {
    expect(parseInput(['position=< 9,  1> velocity=< 0,  2>'])).toEqual([{
      position: {
        x: 9,
        y: 1,
      },
      velocity: {
        x: 0,
        y: 2,
      }
    }]);
  });
});