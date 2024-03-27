const t = require("../global/test.js");
const d = require("../global/day.js");

class Day3 extends d.Day {
    constructor(str) {
        super(str);
        for (let r=0; r<this.lines.length; r++) {
            for (let c=0; c<this.lines[r].length; c++) {
                const char = this.lines[r][c];
                if (char.match(/[^\d\.]/g)) {
                    const nums = this.checkAllAround(r, c);
                    this.answer[0] += nums[0];
                    this.answer[1] += nums[1];
                }
            }
        }
    }
    
    checkAllAround(r, c) {
        const order = [];
        for (let i=-1; i<=1; i++) {
            if (i && isNum(this.lines[r+i][c])) {
                order.push([r+i,c]);
                continue;
            }
            for (let j=-1; j<=1; j++)
                if (i || j)
                    order.push([r+i,c+j]);
        }
        const partnumbers = [];
        for (const [y,x] of order) {
            if (isNum(this.lines[y][x])) {
                const num = this.fullNumber(this.lines[y], x);
                partnumbers.push(num);
            }
        }
        return [
            partnumbers.reduce((sum,n) => sum += n),
            this.lines[r][c] === "*" && partnumbers.length === 2 ? partnumbers[0] * partnumbers[1] : 0
        ];
    }
    
    fullNumber(line, i) {
        let left = i;
        let right = i+1;
        while (left>=0 && isNum(line[left-1]))
            left--;
        while (right<line.length && isNum(line[right]))
            right++;
        return +line.substring(left, right);
    }
}

function isNum(x) {
    return !isNaN(+x);
}

t.test(3, Day3, [4361, 467835]);