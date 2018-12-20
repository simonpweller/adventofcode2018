module.exports = function solve2(ids) {
  for (const [index, id1] of ids.entries()) {
    for (const id2 of ids.slice(index + 1)) {
      const shared = sharedChars(id1, id2);
      if (shared.length === id1.length - 1) {
        return shared;
      }
    }
  }
}

function numDiffs(id1, id2) {
  let diffs = 0;
  id1.split('').forEach((char, index) => {
    if (char !== id2[index]) {
      diffs++;
    }
  });
  return diffs;
}

function sharedChars(id1, id2) {
  return id1.split('').filter((char, index) => char === id2[index]).join('');
}

module.exports.numDiffs = numDiffs;