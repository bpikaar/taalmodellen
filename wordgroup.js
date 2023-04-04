export default class WordGroup {
    /** @type Array */ wordGroup = []
    /** @type string */ nextWord

    get flattendWordGroup() {
        return this.wordGroup.length === 1 ? this.wordGroup.join("") : this.wordGroup.join(" ")
    }

    /**
     * @param {string} wordGroup
     * @param {string} nextWord
     */
    constructor(wordGroup, nextWord) {
        this.wordGroup = wordGroup
        this.nextWord = nextWord
    }
}