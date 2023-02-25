import defaultProfanities from './profanities.json' assert {type: "json"}
import replaceChars from './replaceChars.json' assert {type: "json"}

function formatProfanity(profanity) {
    const regexFormatted = profanity.split('').reduce((word, letter) => {
        if (replaceChars[letter] === undefined) {
            return word+letter
        } else {
            return word+`[${replaceChars[letter].join('')}${letter}]`
        }
    }, '')

    return new RegExp('\\b' + regexFormatted + '\\b', 'i')
}

class ProfanityDetector {
    #profanities = []

    constructor(profanities=defaultProfanities) {
        this.#profanities = profanities.map(profanity => formatProfanity(profanity))
    }

    get profanities() {
        return this.#profanities
    }

    set profanities(profanities) {
        this.#profanities = profanities.map(profanity => formatProfanity(profanity))
    }

    addProfanity(profanity) {
        this.#profanities.push(formatProfanity(profanity))
        return profanity
    }

    removeProfanity(profanity) {
        const profanitiesStrings = this.#profanities.map(profanity => String(profanity))
        const formattedProfanity = String(formatProfanity(profanity))

        const index = profanitiesStrings.indexOf(formattedProfanity)
        if (index < 0) {
            return null
        }

        this.#profanities.splice(index, 1)
        return profanity
    }

    extract(string) {
        for (const regexp of this.#profanities) {
            const regexpResult = regexp.exec(string)

            if (regexpResult) {
                return regexpResult[0]
            }
        }

        return null
    }

    has(string) {
        return this.extract(string) !== null
    }
}

export default ProfanityDetector
