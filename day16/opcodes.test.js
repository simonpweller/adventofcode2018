const {
  addr,
  addi,
  mulr,
  muli,
  banr,
  bani,
  borr,
  bori,
  setr,
  seti,
  gtir,
  gtri,
  gtrr,
  eqir,
  eqri,
  eqrr,
} = require('./opcodes');

describe('opcodes', () => {
  describe('addition', () => {
    describe('addr (add register)', () => {
      it('stores into register C the result of adding register A and register B.', () => {
        expect(addr([3, 2, 1, 1], [2, 1, 2])).toEqual([3, 2, 3, 1]);
      });
    });

    describe('addi (add immediate)', () => {
      it('stores into register C the result of adding register A and value B.', () => {
        expect(addi([3, 2, 1, 1], [2, 1, 2])).toEqual([3, 2, 2, 1]);
      });
    });
  });

  describe('multiplication', () => {
    describe('mulr (multiply register)', () => {
      it('stores into register C the result of multiplying register A and register B.', () => {
        expect(mulr([3, 2, 1, 1], [2, 1, 2])).toEqual([3, 2, 2, 1]);
      });
    });

    describe('muli (multiply immediate)', () => {
      it('stores into register C the result of multiplying register A and value B.', () => {
        expect(muli([3, 2, 1, 1], [2, 1, 2])).toEqual([3, 2, 1, 1]);
      });
    });
  });

  describe('bitwise AND', () => {
    describe('banr (bitwise AND register)', () => {
      it('stores into register C the result of the bitwise AND of register A and register B.', () => {
        expect(banr([3, 2, 1, 1], [2, 1, 2])).toEqual([3, 2, 0, 1]);
      });
    });

    describe('bani (bitwise AND immediate', () => {
      it('stores into register C the result of the bitwise AND of register A and value B.', () => {
        expect(bani([3, 2, 1, 1], [2, 1, 2])).toEqual([3, 2, 1, 1]);
      });
    });
  });

  describe('bitwise OR', () => {
    describe('banr (bitwise OR register)', () => {
      it('stores into register C the result of the bitwise OR of register A and register B.', () => {
        expect(borr([3, 2, 1, 1], [2, 1, 2])).toEqual([3, 2, 3, 1]);
      });
    });

    describe('bani (bitwise OR immediate', () => {
      it('stores into register C the result of the bitwise OR of register A and value B.', () => {
        expect(bori([3, 2, 1, 1], [2, 1, 2])).toEqual([3, 2, 1, 1]);
      });
    });
  });

  describe('assignment', () => {
    describe('setr (set register)', () => {
      it('copies the contents of register A into register C. (Input B is ignored.)', () => {
        expect(setr([3, 2, 1, 1], [2, 1, 2])).toEqual([3, 2, 1, 1]);
      });
    });

    describe('seti (set immediate)', () => {
      it('stores value A into register C. (Input B is ignored.)', () => {
        expect(seti([3, 2, 1, 1], [2, 1, 2])).toEqual([3, 2, 2, 1]);
      });
    });
  });

  describe('greater-than testing', () => {
    describe('gtir (greater-than immediate/register)', () => {
      it('sets register C to 1 if value A is greater than register B. Otherwise, register C is set to 0.', () => {
        expect(gtir([3, 2, 1, 1], [2, 1, 2])).toEqual([3, 2, 0, 1]);
      });
    });
    describe('gtri (greater-than register/immediate)', () => {
      it('sets register C to 1 if register A is greater than value B. Otherwise, register C is set to 0.', () => {
        expect(gtri([3, 2, 1, 1], [2, 1, 2])).toEqual([3, 2, 0, 1]);
      });
    });
    describe('gtrr (greater-than register/register)', () => {
      it('sets register C to 1 if register A is greater than register B. Otherwise, register C is set to 0.', () => {
        expect(gtrr([3, 2, 1, 1], [2, 1, 2])).toEqual([3, 2, 0, 1]);
      });
    });
  });

  describe('equality testing', () => {
    describe('eqir (equal immediate/register)', () => {
      it('sets register C to 1 if value A is equal to register B. Otherwise, register C is set to 0.', () => {
        expect(eqir([3, 2, 1, 1], [2, 1, 2])).toEqual([3, 2, 1, 1]);
      });
    });
    describe('eqri (equal register/immediate)', () => {
      it('sets register C to 1 if register A is equal to value B. Otherwise, register C is set to 0.', () => {
        expect(eqri([3, 2, 1, 1], [2, 1, 2])).toEqual([3, 2, 1, 1]);
      });
    });
    describe('eqrr (equal register/register)', () => {
      it('sets register C to 1 if register A is equal to register B. Otherwise, register C is set to 0.', () => {
        expect(eqrr([3, 2, 1, 1], [2, 1, 2])).toEqual([3, 2, 0, 1]);
      });
    });
  });
});