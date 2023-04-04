import Sentence from "./sentence.js"

export default class nGram {

    /** @type {Sentence[]} */ sentences = []
    /** @type {WordGroup[]} */ wordGroups = []

    /**
     * @param {string} text the complete text to be analyzed 
     * @param {number} n  number of words in a wordgroup
     */
    constructor(text, n) {
        // splits text into sentences
        this.sentences = text.split(".")
            .filter(text => text !== "") // remove empty sentences
            .map(sentence => new Sentence(sentence.trim(), n)) // create sentence objects

        let flattendWordGroups = []

        // collect wordgroups and count them
        for (const sentence of this.sentences) {
            sentence.wordGroups.forEach((value, key) => {
                if (key === 0) {
                    flattendWordGroups.push(value.flattend)
                    this.wordGroups.push(value)
                }
                else {
                    if (flattendWordGroups.includes(value.flattend)) {
                        // add count to wordgroup
                        this.wordGroups
                            .find(wordgroup => wordgroup.word === value.word)
                            .count++
                    } else {
                        flattendWordGroups.push(value.flattend)
                        this.wordGroups.push(value)
                    }
                }

            })
        }
        console.log(flattendWordGroups)
        console.log(this.wordGroups)
    }
}