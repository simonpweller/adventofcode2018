const {
  checkAgainst,
  numberOfMatchingOpcodes,
} = require('./utils');

const {
  mulr,
  addi,
  seti,
} = require('./opcodes');

// have a function for each opcode, which takes registers and instructions as input and returns the updated registers
describe('opcodes', () => {
  let sample;

  beforeEach(() => {
    sample = {
      before: [3, 2, 1, 1],
      instructions: [2, 1, 2],
      after: [3, 2, 2, 1],
    }
  });

  describe('mulr (multiply register)', () => {
    it('stores into register C the result of multiplying register A and register B.', () => {
      expect(mulr(sample.before, sample.instructions)).toEqual(sample.after);
    });
  });
  describe('addi (add immediate)', () => {
    it('stores into register C the result of adding register A and value B.', () => {
      expect(addi(sample.before, sample.instructions)).toEqual(sample.after);
    });
  });
  describe('seti (set immediate)', () => {
    it('stores value A into register C. (Input B is ignored.)', () => {
      expect(seti(sample.before, sample.instructions)).toEqual(sample.after);
    });
  });
});

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

// loop through samples in the the input and count how many behave like three or more opcodes (using numberOfMatchingOpcodes)