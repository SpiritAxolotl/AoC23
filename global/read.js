const read = (day) => {
  const fs = require('fs');
  const testInput = fs.readFileSync(`${process.env.HOME}/Repositories/AoC23/${day}/testinput.txt`, 'utf8');
  const input = fs.readFileSync(`${process.env.HOME}/Repositories/AoC23/${day}/input.txt`, 'utf8');
  return [testInput, input];
};

module.exports = { read };