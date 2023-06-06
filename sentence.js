import WordGroup from "./wordgroup.js"

export default class Sentence {
    /** @type string */ text
    /** @type number */ n
    /** @type WordGroup */ firstWordGroup
    /** @type WordGroup[] */ wordGroups = []

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
        this.text = this.#removePunctuation(this.text) // remove punctuation except period
        const words = this.#textToArray(this.text)

        // Destroy sentence if length is smaller than n, because we cannot make n-grams from it
        if (words.length < this.n) {
            this.text = ""
        } else {
            this.#splitTextsToNGroups(words)
        }
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

        for (let i = words.length - 1; i >= 0; i--) {
            const word = words[i]

            // if last wordgroup, last word is a period
            if (i === words.length - this.n + 1) {
                this.wordGroups.push(new WordGroup(
                    words.slice(i, i + this.n - 1),
                    ".", // end of sentence (this could be replaced by the real punctuation),
                    true
                ))
            } else if (i <= words.length - this.n) {
                const newWordgroup = new WordGroup(
                    words.slice(i, i + this.n - 1),
                    words.slice(i + this.n - 1, i + this.n).join("") // next word
                )
                this.wordGroups.push(newWordgroup)
                if(i === 0) {
                    this.firstWordGroup = newWordgroup
                }
            }
        }
        console.log(this.wordGroups)
    }
}