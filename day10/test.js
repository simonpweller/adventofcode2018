const solve1 = require('./solve1');
const {parseInput} = solve1;

describe('parseInput', () => {
    it('extracts position and velocity for each point', () => {
        expect(parseInput(['position=< 9,  1> velocity=< 0,  2>'])).toEqual([{
            position: {
                x: 9,
                y: 1,
            },
            velocity: {
                x: 0,
                y: 2,
            }
        }]);
    });
});