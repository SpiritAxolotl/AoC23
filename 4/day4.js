require("../global/test.js");
require("../global/day.js");

class Day4 extends Day {
    constructor(str) {
        super(str);
        this.cards = [];
        for (const line of this.lines) {
            const winning = line.substring(line.indexOf(":")+2, line.indexOf("|")-1).trim().split(/\s+/g).map(n=>+n);
            const nums = line.substring(line.indexOf("|")+2).trim().split(/\s+/g).map(n=>+n);
            this.cards.push([winning, nums]);
        }
        let totalWinningNums = 0;
        this.totalCards = [];
        for (let c=0; c<this.cards.length; c++) {
            totalWinningNums += this.evaluateCard(c)[0];
            this.recursiveBS(c);
        }
        this.answer[0] = totalWinningNums;
        this.answer[1] = this.totalCards.reduce((sum,n) => sum += n);
    }
    
    evaluateCard(n) {
        let multi = -1;
        const card = this.cards[n];
        for (const num of card[1])
            if (card[0].includes(num))
                multi++;
        return [multi>=0?2**multi:0, multi+1];
    }
    
    recursiveBS(c) {
        this.totalCards[c] ??= 0;
        this.totalCards[c]++;
        const multi = this.evaluateCard(c)[1];
        for (let i=1; i<=multi; i++)
            this.recursiveBS(c+i);
    }
}

test(4, Day4, [13, 30]);