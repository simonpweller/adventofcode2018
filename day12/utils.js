function parseInput(lines) {
  const [initialState, blank, ...rawNotes] = lines;
  const locations = initialState.split(': ')[1]
    .split('')
    .reduce((prev, curr, index) => {
      if (curr === '#') {
        prev.push(index);
      }
      return prev;
    }, []);

  const notes = rawNotes.filter(note => note.charAt(9) === '#').map(note => note.substr(0, 5));

  return {
    locations,
    notes,
  }
}

function step(initialState, notes) {
  const [currentMin, currentMax] = [Math.min(...initialState), Math.max(...initialState)];
  const nextState = [];
  for (let i = currentMin - 2; i <= currentMax + 2; i++) { // potential locations for plants in the next generation
    if (notes.includes(profile(initialState, i))) {
      nextState.push(i);
    }
  }
  return nextState;
}

function profile(initialState, index) {
  let out = '';
  for (let offset = -2; offset <= 2; offset++) {
    out += initialState.includes(index + offset) ? '#' : '.';
  };
  return out;
}

module.exports = {
  parseInput,
  step,
  profile,
}