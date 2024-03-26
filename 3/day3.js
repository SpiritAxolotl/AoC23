const t = require("../global/test.js");

function day3(str) {
    const answer = [0, 0];
    const lines = str.split("\n");
    for (let r=0; r<lines.length; r++) {
        for (let c=0; c<lines[r].length; c++) {
            const char = lines[r][c];
            if (char.match(/[^\d\.]/g)) {
                const nums = checkAllAround(lines, r, c);
                answer[0] += nums[0];
                answer[1] += nums[1];
            }
        }
    }
    return answer;
}

function checkAllAround(lines, r, c) {
    const order = [];
    for (let i=-1; i<=1; i++) {
        if (i && isNum(lines[r+i][c])) {
            order.push([r+i,c]);
            continue;
        }
        for (let j=-1; j<=1; j++)
            if (i || j)
                order.push([r+i,c+j]);
    }
    const partnumbers = [];
    for (const [y,x] of order) {
        if (isNum(lines[y][x])) {
            const num = fullNumber(lines[y], x);
            partnumbers.push(num);
        }
    }
    return [
        partnumbers.reduce((sum,n) => sum += n),
        lines[r][c] === "*" && partnumbers.length === 2 ? partnumbers[0] * partnumbers[1] : 0
    ];
}

function isNum(x) {
    return !isNaN(+x);
}

function fullNumber(line, i) {
    let left = i;
    let right = i+1;
    while (left>=0 && isNum(line[left-1]))
        left--;
    while (right<line.length && isNum(line[right]))
        right++;
    return +line.substring(left, right);
}

t.test(3, day3, [4361, 467835]);