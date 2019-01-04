function parseInput(lines) {
    return lines.map(line => {
        const [match, xPos, yPos, xVel, yVel] = line
            .match(/position=<\s*(-?\d+),\s*(-?\d+)> velocity=<\s*(-?\d+),\s*(-?\d+)>/)
            .map(parseFloat);

        return {
            position: {
                x: xPos,
                y: yPos,
            },
            velocity: {
                x: xVel,
                y: yVel,
            },
        }
    })
}

module.exports.parseInput = parseInput;