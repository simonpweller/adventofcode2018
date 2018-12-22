const reducer = require('./solve1');

module.exports = function([polymer]) {
  const letters = Array.from(new Set(polymer.toLowerCase().split('')));
  let shortest = Infinity;
  for (const letter of letters) {
    const regex = new RegExp(letter, 'gi');
    const remainingPolymer = polymer.replace(regex, '');
    shortest = Math.min(shortest, reducer([remainingPolymer]));
  }
  return shortest;
}