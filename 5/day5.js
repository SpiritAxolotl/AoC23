require("../global/test.js");
require("../global/day.js");

class Day5 extends Day {
    constructor(str) {
        super(str);
        this.seedsToLocation = [];
        this.seedsToLocation.push(this.lines[0].substring(this.lines[0].indexOf(":")+2).split(/\s+/g).map(i=>+i));
        //this.seedsToLocation[0].sort((a,b)=>a-b);
        const lines = this.lines.slice(2);
        this.almanac = [];
        {
            let index = -1;
            for (const line of lines)
                if (line.includes("map:"))
                    this.almanac[++index] ??= [];
                else if (line !== "")
                    this.almanac[index].push(line.split(/\s+/g).map(i=>+i));
        }
        {
            let index = 0;
            for (const row of this.almanac) {
                const order = [...this.seedsToLocation[index++]];
                const neworder = [...order];
                for (const [destStart, sourceStart, length] of row) {
                    for (let i=0; i<order.length; i++)
                        if (sourceStart <= order[i] && order[i] < sourceStart+length)
                            neworder[i] = destStart+(order[i]-sourceStart);
                    /*don't use this. i think it works but it's hella inefficient
                    for (let i=0; i<length; i++) {
                        const d = order.indexOf(sourceStart+i);
                        if (d !== -1)
                            neworder[d] = destStart+i;
                    }
                    */
                }
                this.seedsToLocation[index] = neworder;
            }
        }
        this.answer[0] = Math.min(...this.seedsToLocation[this.seedsToLocation.length-1]);
    }
}

test(5, Day5, [35, 35], false);