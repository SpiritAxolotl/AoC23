module.exports = {
    Day: class {
        constructor(str) {
            this.answer = [0, 0];
            this.lines = str.split("\n");
        }
        getAnswers() {
            return this.answer;
        }
    }
}