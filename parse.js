const fs = require('fs');

module.exports = file => fs.readFileSync(file).toString().split('\r\n');