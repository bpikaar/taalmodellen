import Sentence from "./sentence.js"

export default class nGram {

    /** @type {Sentence[]} */ sentences = []
    /** @type {string[]} */ firstWordGroups = []
    /** @type {string[]} */ lastWords = []
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

        // let flattendWordGroups = []

        for (const sentence of this.sentences) {
            this.firstWordGroups.push(sentence.firstWordGroup)
            this.lastWords.push(sentence.lastWord)
            this.wordGroups.push(...sentence.wordGroups)
            // flattendWordGroups.push(...sentence.wordGroups.map(wordgroup => wordgroup.flattendWordGroup))
        }
    }

    createSentence() {
        let sentence = ""
        let word = this.#selectFirstWords()

        console.log(word)

        let currentWordGroup = word
        sentence += word

        // TODO: this could fail if selected first wordgroup is also a lastword

        // TODO: cleanup, not needed anymore
        // // select wordGroup if n > 1
        // if (this.n > 2) {
        //     // select random wordgroup
        //     let wordGroup = this.#getRandomWordGroup(word)
        //     console.log("Wordgroup", wordGroup)
        //     sentence = `${wordGroup}`
        //     currentWordGroup = wordGroup
        // }

        while (!this.#isLastWord(word)) {
            word = this.#selectNextWord(currentWordGroup)
            currentWordGroup = this.#formWordGroup(currentWordGroup, word)
            console.log("selected word",word)
            console.log("currentWordGroup",currentWordGroup)
            console.log(this.#isLastWord(word))
            sentence += ` ${word}`
        }
        sentence = this.#replaceFirstLetterToUpper(sentence)
        return sentence + "."
    }

    createText(numberOfSentences) {
        let text = ""
        for (let i = 0; i < numberOfSentences; i++) {
            text += this.createSentence() + " "
        }
        return text.trim()
    }

    #selectFirstWords() {
        // select random first words
        return this.#selectRandomWordGroup(this.firstWordGroups).flattendWordGroup
    }

    // TODO: cleanup, not needed anymore
    // #selectRandomWord(words) {
    //     return words[Math.floor(Math.random() * words.length)]
    // }

    #isLastWord(word) {
        return this.lastWords.includes(word)
    }

    #selectNextWord(currentWordGroup) {
        // select all wordgroups that start with the current wordGroup
        const wordGroups = this.wordGroups.filter(wordGroup => {
            return wordGroup.flattendWordGroup === currentWordGroup
        })
        if(wordGroups.length === 0) {
            console.log("No wordgroup found for", currentWordGroup)
        } else {
            return this.#selectRandomWordGroup(wordGroups).nextWord
        }
    }

    // TODO: cleanup, not needed anymore
    // #getRandomWordGroup(word) {
    //     const wordGroups = this.wordGroups.filter(wordGroup => wordGroup.wordGroup[0] === word)
    //     if(wordGroups.length === 0) {
    //         console.log("No wordgroup found for", word)
    //         return this.#selectRandomWord(this.lastWords)
    //     }
    //     const randomWordGroup = this.#selectRandomWordGroup(wordGroups)
    //     return randomWordGroup.flattendWordGroup
    // }

    #selectRandomWordGroup(wordGroups) {
        return wordGroups[Math.floor(Math.random() * wordGroups.length)]
    }

    #formWordGroup(currentWordGroup, word) {
        const words = currentWordGroup.split(" ")
        if(this.n === 2) {
            return word
        } else {
            return words.slice(1).join(" ") + " " + word
        }
    }

    #replaceFirstLetterToUpper(sentence) {
        return sentence.charAt(0).toUpperCase() + sentence.slice(1)
    }
}