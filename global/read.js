const read = (day) => {
  const fs = require('fs');
  const testInput = fs.readFileSync(`./${day}/testinput.txt`, 'utf8');
  const input = fs.readFileSync(`./${day}/input.txt`, 'utf8');
  return [testInput, input];
};

module.exports = { read };