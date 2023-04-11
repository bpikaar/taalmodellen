import Sentence from "./sentence.js"

export default class nGram {

    /** @type {Sentence[]} */ sentences = []
    /** @type {string[]} */ firstWordGroups = []

    // TODO: cleanup, not needed anymore
    // /** @type {string[]} */ lastWords = []
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
            // TODO: cleanup, not needed anymore
            // this.lastWords.push(sentence.lastWord)
            this.wordGroups.push(...sentence.wordGroups)
            // flattendWordGroups.push(...sentence.wordGroups.map(wordgroup => wordgroup.flattendWordGroup))
        }
    }

    createSentence() {
        let sentence = ""
        let currentWordGroup = this.#selectFirstWordGroup()

        console.log(currentWordGroup)

        sentence += currentWordGroup.flattendWordGroup

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

        while (!currentWordGroup.terminal) {
            currentWordGroup = this.#selectNextWordGroup(currentWordGroup)
            console.log("selected word", currentWordGroup.nextWord)
            console.log("currentWordGroup", currentWordGroup)
            // console.log(this.#isLastWord(currentWordGroup.nextWord))
            sentence += currentWordGroup.terminal ? currentWordGroup.nextWord : ` ${currentWordGroup.nextWord}`
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

    // TODO: cleanup, not needed anymore
    // #selectRandomWord(words) {
    //     return words[Math.floor(Math.random() * words.length)]
    // }

    #isLastWord(word) {
        return this.lastWords.includes(word)
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
    // TODO: cleanup, not needed anymore
    // #formWordGroup(currentWordGroup, word) {
    //     const words = currentWordGroup.split(" ")
    //     if(this.n === 2) {
    //         return word
    //     } else {
    //         return words.slice(1).join(" ") + " " + word
    //     }
    // }

    #replaceFirstLetterToUpper(sentence) {
        return sentence.charAt(0).toUpperCase() + sentence.slice(1)
    }
}