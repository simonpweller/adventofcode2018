module.exports = function (lines) {
  const nodes = parseNodes(lines);
  const [children, metadataQuantity, ...metadata] = nodes;
  return metadata.reduce((prev, curr) => prev + curr, 0); 
}

function parseNodes([str]) {
  return str.split(' ').map(parseFloat);
}

module.exports.parseNodes = parseNodes;