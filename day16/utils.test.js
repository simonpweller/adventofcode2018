const {
  checkAgainst,
  numberOfMatchingOpcodes,
  parseInput,
} = require('./utils');

// have a function that checks if a sample is consistent with an opcode by running the function for the opcode with the input and checking if the output equals that of the sample
describe('checkAgainst', () => {
  it('checks if a sample is consistent with an opcode by running the function for the opcode with the input and checking if the output equals that of the sample', () => {
    const sample = {
      before: [3, 2, 1, 1],
      instructions: [2, 1, 2],
      after: [3, 2, 2, 1],
    }

    expect(checkAgainst('mulr', sample)).toBe(true);
  });
});

// run that function against each opcode for each sample to check how many opcodes the sample is consistent with
describe('numberOfMatchingOpcodes', () => {
  it('checks how many opcodes a sample is consistent with', () => {
    const sample = {
      before: [3, 2, 1, 1],
      instructions: [2, 1, 2],
      after: [3, 2, 2, 1],
    }

    expect(numberOfMatchingOpcodes(sample)).toBe(3);
  });
});

describe('parseInput', () => {
  const lines = [
    'Before: [3, 0, 0, 1]',
    '0 3 0 2',
    'After:  [3, 0, 1, 1]',
    '',
    'Before: [2, 0, 0, 2]',
    '4 0 3 1',
    'After:  [2, 1, 0, 2]',
    '',
    'Before: [0, 1, 1, 1]',
    '14 0 0 2',
    'After:  [0, 1, 0, 1]',
    '',
  ];

  it('parses the input into samples', () => {
    expect(parseInput(lines).samples).toHaveLength(3);
    expect(parseInput(lines).samples[2]).toEqual({
      before: [0, 1, 1, 1],
      instructions: [14, 0, 0, 2],
      after: [0, 1, 0, 1],
    });
  });
});