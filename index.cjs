import defaultProfanities from './profanities.json' assert { type: "json" }
import replaceChars from './replaceChars.json' assert { type: "json" }

function profanityToRegex(profanity) {
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
        this.#profanities = profanities.reduce((object, profanity) => (object[profanity] = profanityToRegex(profanity), object), {})
    }

    get profanities() {
        return Object.keys(this.#profanities)
    }

    set profanities(profanities=[]) {
        this.#profanities = profanities.reduce((object, profanity) => (object[profanity] = profanityToRegex(profanity), object), {})
    }

    addProfanity(profanity) {
        this.#profanities[profanity] = profanityToRegex(profanity)
        return profanity
    }

    removeProfanity(profanity) {
        if (Object.keys(this.#profanities).includes(profanity)) {
            delete this.#profanities[profanity]
        }
    }

    bounds(string) {
        for (const regexp of Object.values(this.#profanities)) {
            regexp.lastIndex = 0;
            const regexpResult = regexp.exec(string)

            if (regexpResult) {
                return [regexpResult.index, regexpResult.index + regexpResult[0].length]
            }
        }

        return null
    }

    // TODO: .boundsAll()

    extract(string) {
        const bounds = this.bounds(string)

        if (bounds !== null) {
            return string.slice(...bounds)
        } else {
            return null
        }
    }

    extractAll(string) {
        let extractedProfanities = []
        let mutableString = string

        while (1) {
            const extractedProfanity = this.bounds(mutableString)
            if (!extractedProfanity) return extractedProfanities
            
            extractedProfanities.push(mutableString.slice(...extractedProfanity))
            mutableString = mutableString.slice(extractedProfanity[1])
        }
    }

    has(string) {
        return Object.values(this.#profanities).some((profanity) => profanity.test(string))
    }

    censor(string, censorCharacter='*', includeFirstLetter=false, includeLastLetter=false) {
        if (!this.has(string)) return string

        let censoredString = string
        const boundsStartOffset = includeFirstLetter ? 1 : 0
        const boundsEndOffset = includeLastLetter ? 1 : 0

        while (1) {
            const profanityBounds = this.bounds(censoredString)
            if (!profanityBounds) return censoredString

            censoredString = censoredString.slice(0, profanityBounds[0] + boundsStartOffset) + censorCharacter.repeat(profanityBounds[1] - profanityBounds[0] - boundsStartOffset - boundsEndOffset) + censoredString.slice(profanityBounds[1] - boundsEndOffset)
        }
    }
}

export default ProfanityDetector
