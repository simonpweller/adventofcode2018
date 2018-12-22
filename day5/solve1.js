module.exports = function([polymer]) {
  for(let i = 0; i < polymer.length - 1; i++) {
    if(polymer[i] !== polymer[i+1] && (polymer[i].toLowerCase() === polymer[i+1].toLowerCase())) {
      polymer = polymer.substr(0, i) + polymer.substr(i + 2);
      i = Math.max(i - 2, -1);
    }
  }
  return polymer.length;
};