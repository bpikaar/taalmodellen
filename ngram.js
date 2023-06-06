import Sentence from "./sentence.js"

export default class nGram {

    /** @type {Sentence[]} */ sentences = []
    /** @type {string[]} */ firstWordGroups = []
    /** @type {WordGroup[]} */ wordGroups = []

    /**
     * @param {string} text the complete text to be analyzed 
     * @param {number} n  number of words in a wordgroup
     */
    constructor(text, n) {
        this.n = n
        // splits text into sentences
        this.sentences = text.split(".")
            .map(sentence => new Sentence(sentence.trim(), n)) // create sentence objects
            .filter(sentence => sentence.text !== "") // remove empty sentences (+ sentences that have emptied themselves)

        for (const sentence of this.sentences) {
            this.firstWordGroups.push(sentence.firstWordGroup)
            this.wordGroups.push(...sentence.wordGroups)
        }
    }

    createSentence() {
        let sentence = ""
        let currentWordGroup = this.#selectFirstWordGroup()

        // add first wordgroup as start of sentence
        sentence += currentWordGroup.flattendWordGroup

        // As long as the wordgroup is not terminal, select next wordgroup
        while (!currentWordGroup.terminal) {
            currentWordGroup = this.#selectNextWordGroup(currentWordGroup)
            sentence += currentWordGroup.terminal ? "" : " "
            sentence += currentWordGroup.nextWord
        }
        sentence = this.#replaceFirstLetterToUpper(sentence)
        return sentence
    }

    createText(numberOfSentences) {
        let text = ""
        for (let i = 0; i < numberOfSentences; i++) {
            text += this.createSentence() + " "
        }
        return text.trim()
    }

    #selectFirstWordGroup() {
        // select random first words
        return this.#selectRandomWordGroup(this.firstWordGroups)
    }

    #selectNextWordGroup(currentWordGroup) {
        // select all wordgroups that start with the end of the current wordGroup
        const wordGroups = this.wordGroups.filter(wordGroup => {
            return wordGroup.flattendWordGroup === currentWordGroup.nextFlattendWordGroup
        })
        if(wordGroups.length === 0) {
            console.log("No wordgroup found for", currentWordGroup)
        } else {
            return this.#selectRandomWordGroup(wordGroups)
        }
    }

    #selectRandomWordGroup(wordGroups) {
        return wordGroups[Math.floor(Math.random() * wordGroups.length)]
    }

    #replaceFirstLetterToUpper(sentence) {
        return sentence.charAt(0).toUpperCase() + sentence.slice(1)
    }
}