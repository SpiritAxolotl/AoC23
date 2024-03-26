const r = require("./read.js");

module.exports = {
    test: function(day, dayfunc, correcttestanswers, part1done) {
        const [testinput, input] = r.read(day);
        const testanswers = dayfunc(testinput);
        if (typeof part1done !== "boolean")
            part1done = true;
        if (testanswers[0] === correcttestanswers[0] && (!part1done || testanswers[1] === correcttestanswers[1])) {
            const s = part1done ? "s" : "";
            console.log(`Test answer${s} passed! Attempting real answer${s}...`);
            const answers = dayfunc(input);
            console.log(`Part 1: ${answers[0]}${part1done ? `\nPart 2: ${answers[1]}` : ""}`);
        } else {
            if (testanswers[0] !== correcttestanswers[0] && (!part1done || testanswers[1] === correcttestanswers[1]))
                console.log(
                    `Part 1 test answer failed.\n` +
                    `Output: ${testanswers[0]}\n` +
                    `Expected: ${correcttestanswers[0]}`
                );
            else if (testanswers[0] === correcttestanswers[0] && testanswers[1] !== correcttestanswers[1])
                console.log(
                    `Part 2 test answer failed.\n` +
                    `Output: ${testanswers[1]}\n` +
                    `Expected: ${correcttestanswers[1]}`
                );
            else
                console.log(
                    `The test answers for both parts failed.\n` +
                    `Part 1 Output: ${testanswers[0]}\n` +
                    `Expected: ${correcttestanswers[0]}\n` +
                    `Part 2 Output: ${testanswers[1]}\n` +
                    `Expected: ${correcttestanswers[1]}`
                );
        }
    }
}