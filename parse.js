const fs = require('fs');

module.exports = file => {
  const str = fs.readFileSync(file).toString();
  return str.includes('\r\n') ? str.split('\r\n') : str.split('\n');
}