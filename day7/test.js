const solve1 = require('./solve1');
const solve2 = require('./solve2');

const {parseLines, nextStep} = solve1;
const lines = [
  'Step C must be finished before step A can begin.',
  'Step C must be finished before step F can begin.',
  'Step A must be finished before step B can begin.',
  'Step A must be finished before step D can begin.',
  'Step B must be finished before step E can begin.',
  'Step D must be finished before step E can begin.',
  'Step F must be finished before step E can begin.',
];
describe('solve2', () => {
  it(`should return the number of seconds it will take to complete all operations.
      numWorkers are available to work in parallel and each step takes baseTime + charIndex seconds to complete
  `, () => {
    expect(solve2(lines, 2, 0)).toBe(15);
  });
});

describe('solve1', () => {
  it('should return the steps in the order they need to be performed in, given an array of lines', () => {
    expect(solve1(lines)).toBe('CABDFE');
  });

  describe('nextStep', () => {
    it('should return the first step without prerequisites given an ordered array of instructions', () => {
      expect(nextStep(parseLines(lines))).toBe('C');
    })
  });

  describe('parseLines', () => {
    it('should parse the input into an ordered array of instructions', () => {
      expect(parseLines(lines)).toEqual([
        {
          step: 'A',
          prerequisites: new Set(['C']),
        },
        {
          step: 'B',
          prerequisites: new Set(['A']),
        },
        {
          step: 'C',
          prerequisites: new Set(),
        },
        {
          step: 'D',
          prerequisites: new Set(['A']),
        },
        {
          step: 'E',
          prerequisites: new Set(['B', 'D', 'F']),
        },
        {
          step: 'F',
          prerequisites: new Set(['C']),
        },
      ]);
    });
  });
});