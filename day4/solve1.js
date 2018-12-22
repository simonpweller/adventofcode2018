module.exports = function(lines) {
  const shifts = analyseLogs(lines);
  const guards = {};
  let maxMinutes = 0;
  let guard;
  for (const shift of shifts) {
    if(!guards[shift.guard]) guards[shift.guard] = 0;
    guards[shift.guard] += minutesAsleep(shift);
    if (guards[shift.guard] > maxMinutes) {
      maxMinutes = guards[shift.guard];
      guard = shift.guard;
    }
  }

  const guardShifts = shifts.filter(shift => shift.guard === guard);
  const minute = mostAsleepMinute(guardShifts).minute;
  return {
    guard,
    minute,
  };
}

function mostAsleepMinute(shifts) {
  const minutes = {}
  for (shift of shifts) {
    for (let minute = 0; minute < 60; minute++) {
      if (shift.minutes[minute] === '#') {
        if(!minutes[minute]) minutes[minute] = 0;
        minutes[minute]++;
      }
    }
  }
  const mostAsleep = Math.max(...Object.values(minutes), 0);
  const entry = Object.entries(minutes).find(entry => entry[1] === mostAsleep);
  return {
    minute: entry ? Number(entry[0]) : 0,
    times: mostAsleep,
  };
}

function minutesAsleep(shift) {
  return shift.minutes.replace(/\./g, '').length;
}

function analyseLogs(lines = []) {
  const sortedLines = sortLines(lines);
  const shifts = [];
  let shift = [];
  for(const line of lines) {
    if (parseLine(line).guard) {
      // analys previous shift
      if(shift.length) {
        shifts.push(analyseShift(shift));
      }
      // start next shift
      shift = [line];
    } else {
      shift.push(line);
    }
  }
  shifts.push(analyseShift(shift));
  return shifts;
}

function analyseShift(lines = []) {
  let asleep = false;
  let currentMinute = 0;
  let minutes = '';
  
  for (const line of lines) {
    const parsedLine = parseLine(line);
    if (parsedLine.guard) {
      var guard = parsedLine.guard;
      continue;
    }
    if (parsedLine.fallingAsleep) {
      minutes += '.'.repeat(parsedLine.minute - currentMinute);
      asleep = true;
    } else if (parsedLine.wakingUp) {
      minutes += '#'.repeat(parsedLine.minute - currentMinute);
      asleep = false;
    }
    currentMinute = parsedLine.minute;
  }

  const finishShiftWith = asleep ? '#' : '.';
  minutes += finishShiftWith.repeat(60 - currentMinute);

  return {
    guard,
    minutes,
  }
}

function sortLines(lines = []) {
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
module.exports.analyseShift = analyseShift;
module.exports.analyseLogs = analyseLogs;
module.exports.minutesAsleep = minutesAsleep;
module.exports.mostAsleepMinute = mostAsleepMinute;