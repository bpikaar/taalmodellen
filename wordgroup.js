export default class WordGroup {
    /** @type Array */ wordGroup = []
    /** @type string */ nextWord
    /** @type boolean */ terminal

    get flattendWordGroup() {
        return this.wordGroup.length === 1 ? this.wordGroup.join("") : this.wordGroup.join(" ")
    }

    get nextFlattendWordGroup() {
        return this.wordGroup.length === 1 ? this.nextWord : this.wordGroup.slice(1).join(" ") +
            ` ${this.nextWord}`
    }

    /**
     * @param {string} wordGroup
     * @param {string} nextWord
     * @param {boolean} terminal
     */
    constructor(wordGroup, nextWord, terminal=false) {
        this.wordGroup = wordGroup
        this.nextWord = nextWord
        this.terminal = terminal
    }
}