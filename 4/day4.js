const t = require("../global/test.js");

function day4(str) {
    const answer = [0, 0];
    const lines = str.split("\n");
    const cards = [];
    for (const line of lines) {
        const winning = line.substring(line.indexOf(":")+2, line.indexOf("|")-1).trim().split(/\s+/g).map(n=>+n);
        const nums = line.substring(line.indexOf("|")+2).trim().split(/\s+/g).map(n=>+n);
        cards.push([winning, nums]);
    }
    let totalWinningNums = 0;
    const totalCards = [];
    for (let c=0; c<cards.length; c++) {
        totalWinningNums += evaluateCard(c, cards)[0];
        recursiveBS(c, cards, totalCards);
    }
    answer[0] = totalWinningNums;
    answer[1] = totalCards.reduce((sum,n) => sum += n);
    return answer;
}

function evaluateCard(n, cards) {
    let multi = -1;
    const card = cards[n];
    for (const num of card[1])
        if (card[0].includes(num))
            multi++;
    return [multi>=0?2**multi:0, multi+1];
}

function recursiveBS(c, cards, totalCards) {
    totalCards[c] ??= 0;
    totalCards[c]++;
    const multi = evaluateCard(c, cards)[1];
    for (let i=1; i<=multi; i++)
        recursiveBS(c+i, cards, totalCards);
}

t.test(4, day4, [13, 30]);