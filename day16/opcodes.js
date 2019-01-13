function mulr(register, instructions) {
  // stores into register C the result of multiplying register A and register B
  register[instructions[2]] = register[instructions[0]] * register[instructions[1]];
  return register;
}

function addi(register, instructions) {
  // stores into register C the result of adding register A and value B.
  register[instructions[2]] = register[instructions[0]] + instructions[1];
  return register;
}

function seti(register, instructions) {
  // stores value A into register C. (Input B is ignored.)
  register[instructions[2]] = instructions[0];
  return register;
}

module.exports = {
  mulr,
  addi,
  seti,
}