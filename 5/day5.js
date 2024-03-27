const t = require("../global/test.js");
const d = require("../global/day.js");

class Day5 extends d.Day {
    constructor(str) {
        super(str);
        this.seeds = lines[0].substring(lines[0].indexOf(":")+2).split(/\s+/g).map(i=>+i);
        this.lines.splice(0,2);
        this.map = [];
        {
            let index = -1;
            for (const line of lines)
                if (line.includes("map:"))
                    map[++index] ??= [];
                else if (line !== "")
                    map[index].push(line.split(/\s+/g));
        }
    }
}

t.test(5, Day5, [35, 35], false);