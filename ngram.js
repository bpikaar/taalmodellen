import Sentence from "./sentence.js"

export default class nGram {

    /** @type {Sentence[]} */           sentences   = []
    /** @type {string[]} */             firstWordGroups = []
    /** @type {WordGroup[]} */          wordGroups = []
    /** @type {number} */               temperature    = 0.1
    /** @type {Map<string, number>} */  wordGroupFrequencies = new Map()

    /**
     * @param {string} text the complete text to be analyzed
     * @param {number} n number of words in a wordgroup
     * @param {number} temperature controls randomness (0.0-1.0, lower means less random)
     */
    constructor(text, n, temperature = 1.0) {
        this.n = n
        this.temperature = Math.max(0.01, Math.min(1.0, temperature)) // clamp between 0.01 and 1.0

        // splits text into sentences
        this.sentences = text.split(".")
            .map(sentence => new Sentence(sentence.trim(), n)) // create sentence objects
            .filter(sentence => sentence.text !== "") // remove empty sentences (+ sentences that have emptied themselves)

        for (const sentence of this.sentences) {
            this.firstWordGroups.push(sentence.firstWordGroup)
            this.wordGroups.push(...sentence.wordGroups)
        }

        // Count frequencies of wordGroups
        this.calculateWordGroupFrequencies()
    }

    /**
     * Calculate and store frequencies of all wordGroups
     */
    calculateWordGroupFrequencies() {
        // Count frequencies of firstWordGroups
        // for (const wordGroup of this.firstWordGroups) {
        //     const key = wordGroup.flattendWordGroup
        //     this.wordGroupFrequencies.set(key, (this.wordGroupFrequencies.get(key) || 0) + 1)
        // }

        // Count frequencies of all wordGroups
        for (const wordGroup of this.wordGroups) {
            const key = wordGroup.flattendWordGroup
            this.wordGroupFrequencies.set(key, (this.wordGroupFrequencies.get(key) || 0) + 1)
        }
    }

    /**
     * Sets a new temperature value
     * @param {number} temperature new temperature (0.0-1.0)
     */
    setTemperature(temperature) {
        this.temperature = Math.max(0.01, Math.min(1.0, temperature)) // clamp between 0.01 and 1.0
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
        // select first words based on temperature
        return this.#selectWeightedWordGroup(this.firstWordGroups)
    }

    #selectNextWordGroup(currentWordGroup) {
        // select all wordgroups that start with the end of the current wordGroup
        const wordGroups = this.wordGroups.filter(wordGroup => {
            return wordGroup.flattendWordGroup === currentWordGroup.nextFlattendWordGroup
        })

        if(wordGroups.length === 0) {
            console.log("No wordgroup found for", currentWordGroup)
            return currentWordGroup // Return current as fallback to avoid errors
        } else {
            return this.#selectWeightedWordGroup(wordGroups)
        }
    }

    /**
     * Select a wordGroup based on frequency and temperature
     * @param {WordGroup[]} wordGroups array of possible wordGroups to select from
     * @returns {WordGroup} selected wordGroup
     */
    #selectWeightedWordGroup(wordGroups) {
        // If temperature is 1.0, use pure random selection (original behavior)
        if (this.temperature >= 0.99) {
            return wordGroups[Math.floor(Math.random() * wordGroups.length)]
        }

        // Calculate weights based on frequencies
        const weights = wordGroups.map(wordGroup => {
            // Get frequency of the wordGroup (default to 1 if not found)
            const frequency = this.wordGroupFrequencies.get(wordGroup.flattendWordGroup) || 1
            // Apply temperature to weights (lower temp means higher weight differences)
            return Math.pow(frequency, 1 / this.temperature)
        })

        console.log("weights", weights);

        // Calculate sum of all weights
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)

        console.log("totalWeight", totalWeight);

        // Generate random value between 0 and totalWeight
        let random = Math.random() * totalWeight

        // Find the selected index based on weights
        for (let i = 0; i < weights.length; i++) {
            random -= weights[i]
            if (random <= 0) {
                return wordGroups[i]
            }
        }

        // Fallback to last item (should rarely happen due to rounding)
        return wordGroups[wordGroups.length - 1]
    }

    #replaceFirstLetterToUpper(sentence) {
        return sentence.charAt(0).toUpperCase() + sentence.slice(1)
    }
}