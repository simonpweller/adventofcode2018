const { parseInput, splitSample, numberOfMatchingOpcodes } = require('./utils');

module.exports = function (lines) {
  return parseInput(lines).samples.reduce((count, sample) => {
    return count += Number(numberOfMatchingOpcodes(splitSample(sample).sample) >= 3);
  }, 0);
}
