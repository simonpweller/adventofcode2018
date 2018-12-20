const parse = require('./parse');
const solve = require(`./day${process.argv[2]}/solve${process.argv[3]}`);

console.log(solve(parse(`./day${process.argv[2]}/input.txt`)));