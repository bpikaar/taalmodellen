import WordGroup from "./wordgroup.js"

export default class Sentence {
    /** @type string */ text
    /** @type number */ n
    /** @type string */ lastWord
    /** @type string */ firstWord
    /** @type WordGroup[] */ wordGroups = []

    /**
     * @param {string} lastword
     */
    set LastWord(lastword) {
        this.lastWord = this.#removePeriod(lastword)
    }
    get LastWord() {
        return this.lastWord
    }

    /**
     * @param {string} input 
     * @param {number} n
     */
    constructor(input, n) {
        this.text = input.toLowerCase()
        this.n = n

        this.run()
    }

    run() {
        this.text = this.#removePunctuation(this.text)
        const words = this.#textToArray(this.text)
        this.#splitTextsToNGroups(words)
        // console.log(this.wordGroups)
    }

    /**
     * 
     * @param {string} text 
     */
    #textToArray(text) {
        return text.split(" ").filter(word => word !== "")
    }

    #removePunctuation(text) {
        // without period
        return text.replace(/[,\/#!?$%^&’‘*;:{}=\-_`~()]/g, "")
    }

    /**
     * @param {Array} words 
     */
    #splitTextsToNGroups(words) {
        // De hond rent in de tuin
        for (let i = words.length - 1; i >= 0; i--) {
            const word = words[i]

            if (i === words.length - 1) {
                this.LastWord = word
            } else if (i <= words.length - this.n) {
                if(i === 0) {
                    this.firstWord = word
                }
                this.wordGroups.push(new WordGroup(
                    words.slice(i, i + this.n - 1),
                    this.#removePeriod(words.slice(i + this.n - 1, i + this.n).join("")) // next word
                ))
            }
        }
        console.log(this.wordGroups)
    }

    /**
     * 
     * @param {string} word 
     */
    #removePeriod(word) {
        return word.replace(/\./g, "")
    }
}