function parseInput(lines) {
  const [line] = lines;
  return line;
}

function steps(steps) {
  const scores = [3, 7];
  let positions = [0, 1];

  for (let i = 0; i < steps; i++) {
    step({ scores, positions });
  }

  return {
    scores,
    positions,
  }
}

function nRecipes(n) {
  const scores = [3, 7];
  let positions = [0, 1];

  while (scores.length < n) {
    step({ scores, positions });
  }

  return scores.slice(0, n);
}

function step({ scores, positions }) {
  const [firstElf, secondElf] = positions;
  const combinedScore = scores[firstElf] + scores[secondElf];
  const newScores = String(combinedScore).split('').map(parseFloat);
  scores.push(...newScores);
  positions.forEach((position, index) => {
    const target = position + 1 + scores[position];
    positions[index] = target % scores.length;
  });
}

module.exports = {
  parseInput,
  step,
  steps,
  nRecipes,
}