const parseLine = require('./solve1').parseLine;
const sortLines = require('./solve1').sortLines;

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