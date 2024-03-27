require("../global/test.js");
require("../global/day.js");

class Day5 extends Day {
    constructor(str) {
        super(str);
        this.seeds = this.lines[0].substring(this.lines[0].indexOf(":")+2).split(/\s+/g).map(i=>+i);
        const lines = this.lines.slice(2);
        this.map = [];
        {
            let index = -1;
            for (const line of lines)
                if (line.includes("map:"))
                    this.map[++index] ??= [];
                else if (line !== "")
                    this.map[index].push(line.split(/\s+/g));
        }
    }
}

test(5, Day5, [35, 35], false);