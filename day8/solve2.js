const utils = require('./solve1');
const { nodeLength, parseNodes } = utils;

module.exports = function (lines) {
  const nodes = parseNodes(lines);
  return reduceNodes(nodes);
}

function reduceNodes(nodes) {
  const [children, metadataQuantity, ...values] = nodes;
  const metadata = values.slice(values.length - metadataQuantity);
  const outerValue = metadata.reduce((prev, curr) => prev + curr, 0);

  if (children === 0) {
    return outerValue;
  }
  const childValues = extractChildValues(values, children);
  return sumAcrossChildValuesByMetadataIndices(childValues, metadata);
}

function extractChildValues(values, children) {
  let startPosition = 0;
  const childValues = [];
  for (let childIndex = 0; childIndex < children; childIndex++) {
    const lengthOfNextChild = nodeLength(values.slice(startPosition));
    childValues.push(reduceNodes(values.slice(startPosition, startPosition + lengthOfNextChild)));
    startPosition += lengthOfNextChild;
  }
  return childValues;
}

function sumAcrossChildValuesByMetadataIndices(childValues, metadata) {
  let totalChildValue = 0;
  for (let metaEntry of metadata) {
    if (childValues[metaEntry - 1]) {
      totalChildValue += childValues[metaEntry - 1];
    }
  }
  return totalChildValue;
}