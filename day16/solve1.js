const { parseInput, numberOfMatchingOpcodes } = require('./utils');

module.exports = function (lines) {
  return parseInput(lines).reduce((count, sample) => {
    return count += Number(numberOfMatchingOpcodes(getBasicSample(sample)) >= 3);
  }, 0);
}

function getBasicSample(sample) {
  sample.instructions.shift();
  return sample;
}