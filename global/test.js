const { read } = require("./read.js");

const test = (day, dayClass, correctTestAnswers, partOneDone=false) => {
  const [testInput, input] = read(day);
  const s = partOneDone ? "s" : "";
  console.log(`Attempting test answer${s}...`);
  const testAnswers = new dayClass(testInput).getAnswers();
  if (testAnswers[0] === correctTestAnswers[0] && (!partOneDone || testAnswers[1] === correctTestAnswers[1])) {
    console.log(`Test answer${s} passed! Attempting real answer${s}...`);
    const answers = new dayClass(input).getAnswers();
    console.log(`Part 1: ${answers[0]}${partOneDone ? `\nPart 2: ${answers[1]}` : ""}`);
  } else {
    if (testAnswers[0] !== correctTestAnswers[0] && (!partOneDone || testAnswers[1] === correctTestAnswers[1]))
      console.log(
        `Part 1 test answer failed.\n` +
        `Output: ${testAnswers[0]}\n` +
        `Expected: ${correctTestAnswers[0]}`
      );
    else if (testAnswers[0] === correctTestAnswers[0] && testAnswers[1] !== correctTestAnswers[1])
      console.log(
        `Part 2 test answer failed.\n` +
        `Output: ${testAnswers[1]}\n` +
        `Expected: ${correctTestAnswers[1]}`
      );
    else
      console.log(
        `The test answers for both parts failed.\n` +
        `Part 1 Output: ${testAnswers[0]}\n` +
        `Expected: ${correctTestAnswers[0]}\n` +
        `Part 2 Output: ${testAnswers[1]}\n` +
        `Expected: ${correctTestAnswers[1]}`
      );
  }
};

module.exports = { test };