export default class WordGroup {
    /** @type string */ word
    /** @type Array */ nextWords = []
    /** @type number */ count = 1

    get flattend() {
        return this.word + " " + this.nextWords.join(" ")
    }

    constructor(word, nextWords) {
        this.word = word
        this.nextWords = nextWords
    }
}