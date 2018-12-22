const solve = require('./solve1');
const solve2 = require('./solve2');
const {
  parseLine,
  sortLines,
  analyseShift,
  analyseLogs,
  minutesAsleep,
} = solve;

describe('parsing the input', () => {
  describe('sortLines', () => {
    it('sorts the lines chronologically from earliest to latest', () => {
      expect(sortLines([
        '[1518-11-02 00:40]',
        '[1518-11-01 00:30]',
        '[1518-11-01 00:25]',
        '[1518-11-01 23:58]',
        '[1518-11-01 00:55]',
      ])).toEqual([
        '[1518-11-01 00:25]',
        '[1518-11-01 00:30]',
        '[1518-11-01 00:55]',
        '[1518-11-01 23:58]',
        '[1518-11-02 00:40]',
      ]);
    });
  })

  describe('parseLine', () => {
    it('returns an object', () => {
      expect(parseLine('[1518-11-01 00:00] Guard #10 begins shift')).toBeInstanceOf(Object);
    });

    it('parses out the year, month, day, hour and minute', () => {
      expect(parseLine('[1518-11-01 23:58] Guard #99 begins shift').year).toBe(1518);
      expect(parseLine('[1518-11-01 23:58] Guard #99 begins shift').month).toBe(11);
      expect(parseLine('[1518-11-01 23:58] Guard #99 begins shift').day).toBe(1);
      expect(parseLine('[1518-11-01 23:58] Guard #99 begins shift').hour).toBe(23);
      expect(parseLine('[1518-11-01 23:58] Guard #99 begins shift').minute).toBe(58);
    });
    
    it('parses out the id of a guard starting his shift', () => {
      expect(parseLine('[1518-11-01 00:00] Guard #10 begins shift').guard).toBe(10);
    });
    
    it('parses out fallingAsleep', () => {
      expect(parseLine('[1518-11-02 00:40] falls asleep').fallingAsleep).toBe(true);
    });

    it('parses out wakingUp', () => {
      expect(parseLine('[1518-11-02 00:50] wakes up').wakingUp).toBe(true);
    })
  });
});

describe('analyseShift', () => {
  
  it('returns an object', () => {
    expect(analyseShift()).toBeInstanceOf(Object);
  });
  
  it('parses the id of the guard on duty', () => {
    const lines = [
      '[1518-11-01 00:00] Guard #10 begins shift',
      '[1518-11-01 00:05] falls asleep',
    ];
    expect(analyseShift(lines).guard).toBe(10);
  });

  it('maps out whether the guard is asleep or awake for each minute between 00:00 and 00:59', () => {
    const lines = [
      '[1518-11-01 00:00] Guard #10 begins shift',
      '[1518-11-01 00:05] falls asleep',
      '[1518-11-01 00:25] wakes up',
      '[1518-11-01 00:30] falls asleep',
      '[1518-11-01 00:55] wakes up',
    ];
    expect(analyseShift(lines).minutes).toBe('.....####################.....#########################.....');
  });
  
  it('only accounts 60 minutes even if the guard starts his shift before midnight', () => {
    const lines = [
      '[1518-11-01 23:58] Guard #99 begins shift',
      '[1518-11-02 00:40] falls asleep',
      '[1518-11-02 00:50] wakes up',
    ];
    expect(analyseShift(lines).guard).toBe(99);
    expect(analyseShift(lines).minutes).toBe('........................................##########..........');
  });

  it('accounts for the full 60 minutes even if the guard starts his shift after midnight', () => {
    const lines = [
      '[1518-11-03 00:05] Guard #10 begins shift',
      '[1518-11-03 00:24] falls asleep',
      '[1518-11-03 00:29] wakes up',
    ];
    expect(analyseShift(lines).guard).toBe(10);
    expect(analyseShift(lines).minutes).toBe('........................#####...............................');
  });
  
  it('works even if the guard does not fall asleep', () => {
    const lines = ['[1518-11-03 00:05] Guard #10 begins shift'];
    expect(analyseShift(lines).minutes).toBe('............................................................');
  });
});

describe('analyseLogs', () => {
  it('returns an array of shifts', () => {
    expect(analyseLogs()).toBeInstanceOf(Array);
  });

  it('splits the logs into shifts and analyses them', () => {
    const lines = [
      '[1518-11-01 00:00] Guard #10 begins shift',
      '[1518-11-01 00:05] falls asleep',
      '[1518-11-01 00:25] wakes up',
      '[1518-11-01 00:30] falls asleep',
      '[1518-11-01 00:55] wakes up',
      '[1518-11-01 23:58] Guard #99 begins shift',
      '[1518-11-02 00:40] falls asleep',
      '[1518-11-02 00:50] wakes up',
      '[1518-11-03 00:05] Guard #10 begins shift',
      '[1518-11-03 00:24] falls asleep',
      '[1518-11-03 00:29] wakes up',
      '[1518-11-04 00:02] Guard #99 begins shift',
      '[1518-11-04 00:36] falls asleep',
      '[1518-11-04 00:46] wakes up',
      '[1518-11-05 00:03] Guard #99 begins shift',
      '[1518-11-05 00:45] falls asleep',
      '[1518-11-05 00:55] wakes up',
    ];
    const shifts = analyseLogs(lines);
    expect(shifts.length).toBe(5);

    const singleLine = '[1518-11-01 00:00] Guard #10 begins shift';
    expect(analyseLogs([singleLine]).length).toBe(1);
  });
});

describe('minutes asleep', () => {
  it('returns the total number of minutes a guard is asleep in a given shift', () => {
    expect(minutesAsleep({
      guard: 10,
      minutes: '.....####################.....#########################.....',
    })).toBe(45);
  });
});

const lines = [
  '[1518-11-01 00:00] Guard #10 begins shift',
  '[1518-11-01 00:05] falls asleep',
  '[1518-11-01 00:25] wakes up',
  '[1518-11-01 00:30] falls asleep',
  '[1518-11-01 00:55] wakes up',
  '[1518-11-01 23:58] Guard #99 begins shift',
  '[1518-11-02 00:40] falls asleep',
  '[1518-11-02 00:50] wakes up',
  '[1518-11-03 00:05] Guard #10 begins shift',
  '[1518-11-03 00:24] falls asleep',
  '[1518-11-03 00:29] wakes up',
  '[1518-11-04 00:02] Guard #99 begins shift',
  '[1518-11-04 00:36] falls asleep',
  '[1518-11-04 00:46] wakes up',
  '[1518-11-05 00:03] Guard #99 begins shift',
  '[1518-11-05 00:45] falls asleep',
  '[1518-11-05 00:55] wakes up',
];

describe('solve1', () => {
  it('returns the id of the guard who spends the most time asleep', () => {
    expect(solve(lines).guard).toBe(10);
  });

  it('returns the minute that guard is asleed during the most', () => {
    expect(solve(lines).minute).toBe(24);
  });
});

describe('solve2', () => {
  it('returns the id of the guard who is most often asleep at the same minute', () => {
    expect(solve2(lines).guard).toBe(99);
  });

  it('returns the minute that guard is most often asleep during', () => {
    expect(solve2(lines).minute).toBe(45);
  });
});