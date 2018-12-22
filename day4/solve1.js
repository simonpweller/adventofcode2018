module.exports = function(lines) {
  console.log(sortLines(lines));
}

function sortLines(lines) {
  return lines.sort((lineA, lineB) => {
    const [a, b] = [parseLine(lineA), parseLine(lineB)];
    return new Date(a.year, a.month - 1, a.day, a.hour, a.minute) - new Date(b.year, b.month - 1, b.day, b.hour, b.minute)
  });
}

function parseLine(line) {
  const [match, year, month, day, hour, minute] = line
    .match(/\[(\d+)-(\d+)-(\d+) (\d+):(\d+)\]/)
    .map(parseFloat);
  const guard = line.includes('#') ? parseFloat(line.match(/#(\d+)/)[1]) : undefined;
  const fallingAsleep = line.includes('falls asleep');
  const wakingUp = line.includes('wakes up');
  
  return {
    year,
    month,
    day,
    hour,
    minute,
    guard,
    fallingAsleep,
    wakingUp,
  };
}

module.exports.parseLine = parseLine;
module.exports.sortLines = sortLines;