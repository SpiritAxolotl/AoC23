require("../global/test.js");
require("../global/day.js");

class Day5 extends Day {
    constructor(str) {
        super(str);
        this.seedsToLocation = [];
        this.seedsToLocation.push(this.lines[0].substring(this.lines[0].indexOf(":")+2).split(/\s+/g).map(i=>+i));
        this.seedsToLocation2 = [[]];
        //i feel like amber with this section
        //okay this attempt at part 2 works for the test case but like the other piece of commented out code, it isn't scalable
        //gonna rewrite in a min. I already thought of a better implementation of both parts
        for (let i=0; i<this.seedsToLocation[0].length; i+=2)
            for (let j=0; j<this.seedsToLocation[0][i+1]; j++) {
                try {
                    this.seedsToLocation2[0].push(this.seedsToLocation[0][0]+j);
                } catch (e) {
                    console.log("RangeError: Invalid array length"); //when this.seedsToLocation2[0].length >= 112813858
                }
            }
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
        this.mapSeedsToLocation(this.seedsToLocation);
        this.mapSeedsToLocation(this.seedsToLocation2);
        this.answer[0] = Math.min(...this.seedsToLocation[this.seedsToLocation.length-1]);
        this.answer[1] = Math.min(...this.seedsToLocation2[this.seedsToLocation2.length-1]);
    }
    mapSeedsToLocation(map) {
        let index = 0;
        for (const row of this.almanac) {
            const order = [...map[index++]];
            const neworder = [...order];
            for (const [destStart, sourceStart, length] of row) {
                for (let i=0; i<order.length; i++)
                    if (sourceStart <= order[i] && order[i] < sourceStart+length)
                        neworder[i] = destStart+order[i]-sourceStart;
                /*don't use this. i think it works but it's hella inefficient
                for (let i=0; i<length; i++) {
                    const d = order.indexOf(sourceStart+i);
                    if (d !== -1)
                        neworder[d] = destStart+i;
                }
                */
            }
            map[index] = neworder;
        }
    }
}

test(5, Day5, [35, 46]);