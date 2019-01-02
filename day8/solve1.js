module.exports = function (lines) {
  const nodes = parseNodes(lines);
  return reduceNodes(nodes);
}

function reduceNodes(nodes) {
  const [children, metadataQuantity, ...values] = nodes;
  const metadata = values.slice(values.length - metadataQuantity);
  const outerValue = metadata.reduce((prev, curr) => prev + curr, 0);

  let sumOfChildren = 0;
  let startPosition = 0;
  for (let childIndex = 0; childIndex < children; childIndex++) {
    const lengthOfNextChild = nodeLength(values.slice(startPosition));
    sumOfChildren += reduceNodes(values.slice(startPosition, startPosition + lengthOfNextChild));
    startPosition += lengthOfNextChild;
  }
  return sumOfChildren + outerValue;
}

function nodeLength(nodes) {
  const [children, metadataQuantity, ...values] = nodes;
  if (children === 0) {
    return metadataQuantity + 2;
  } else {
    let totalLength = 2 + metadataQuantity;
    let remainingValues = [...values];
    for (let childIndex = 0; childIndex < children; childIndex++) {
      const childLength = nodeLength(remainingValues);
      totalLength += childLength;
      remainingValues = remainingValues.slice(childLength);
    }
    return totalLength;
  }
}

function parseNodes([str]) {
  return str.split(' ').map(parseFloat);
}

module.exports.parseNodes = parseNodes;
module.exports.nodeLength = nodeLength;
