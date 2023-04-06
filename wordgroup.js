export default class WordGroup {
    /** @type Array */ wordGroup = []
    /** @type string */ nextWord
    /** @type boolean */ terminal

    get flattendWordGroup() {
        return this.wordGroup.length === 1 ? this.wordGroup.join("") : this.wordGroup.join(" ")
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