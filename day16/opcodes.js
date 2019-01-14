function addr(register, instructions) {
  // stores into register C the result of adding register A and register B.
  register[instructions[2]] = register[instructions[0]] + register[instructions[1]];
  return register;
}

function addi(register, instructions) {
  // stores into register C the result of adding register A and value B.
  register[instructions[2]] = register[instructions[0]] + instructions[1];
  return register;
}

function mulr(register, instructions) {
  // stores into register C the result of multiplying register A and register B
  register[instructions[2]] = register[instructions[0]] * register[instructions[1]];
  return register;
}

function muli(register, instructions) {
  // stores into register C the result of multiplying register A and value B.
  register[instructions[2]] = register[instructions[0]] * instructions[1];
  return register;
}

function banr(register, instructions) {
  // stores into register C the result of the bitwise AND of register A and register B.
  register[instructions[2]] = register[instructions[0]] & register[instructions[1]];
  return register;
}

function bani(register, instructions) {
  // stores into register C the result of the bitwise AND of register A and value B.
  register[instructions[2]] = register[instructions[0]] & instructions[1];
  return register;
}

function borr(register, instructions) {
  // stores into register C the result of the bitwise OR of register A and register B.
  register[instructions[2]] = register[instructions[0]] | register[instructions[1]];
  return register;
}

function bori(register, instructions) {
  // stores into register C the result of the bitwise OR of register A and value B.
  register[instructions[2]] = register[instructions[0]] | instructions[1];
  return register;
}

function setr(register, instructions) {
  // stores register A into register C. (Input B is ignored.)
  register[instructions[2]] = register[instructions[0]];
  return register;
}

function seti(register, instructions) {
  // stores value A into register C. (Input B is ignored.)
  register[instructions[2]] = instructions[0];
  return register;
}

function gtir(register, instructions) {
  // sets register C to 1 if value A is greater than register B. Otherwise, register C is set to 0.
  register[instructions[2]] = Number(instructions[0] > register[instructions[1]]);
  return register;
}

function gtri(register, instructions) {
  // sets register C to 1 if register A is greater than value B. Otherwise, register C is set to 0.
  register[instructions[2]] = Number(register[instructions[0]] > instructions[1]);
  return register;
}

function gtrr(register, instructions) {
  // sets register C to 1 if register A is greater than register B. Otherwise, register C is set to 0.
  register[instructions[2]] = Number(register[instructions[0]] > register[instructions[1]]);
  return register;
}

function eqir(register, instructions) {
  // sets register C to 1 if value A is equal to register B. Otherwise, register C is set to 0.
  register[instructions[2]] = Number(instructions[0] === register[instructions[1]]);
  return register;
}

function eqri(register, instructions) {
  // sets register C to 1 if register A is equal to value B. Otherwise, register C is set to 0.
  register[instructions[2]] = Number(register[instructions[0]] === instructions[1]);
  return register;
}

function eqrr(register, instructions) {
  // sets register C to 1 if register A is equal to register B. Otherwise, register C is set to 0.
  register[instructions[2]] = Number(register[instructions[0]] === register[instructions[1]]);
  return register;
}

module.exports = {
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
}