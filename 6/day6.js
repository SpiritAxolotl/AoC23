require("../global/test.js");
require("../global/day.js");

class Day6 extends Day {
  constructor(str) {
    super(str);
    this.races = [];
    for (const line of this.lines) {
      const split = line.split(/\s+/g);
      const measure = split[0].replaceAll(":","").toLowerCase();
      for (let i=1; i<split.length; i++) {
        this.races[i-1] ??= {};
        this.races[i-1][measure] = +split[i];
      }
    }
    //for (let held=0; held<this.races[0].time; held++) {}
  }
}

test(6, Day6, [288, 0], false);