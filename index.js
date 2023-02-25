import defaultProfanities from './profanities.json' assert {type: "json"}
import replaceChars from './replaceChars.json' assert {type: "json"}

class ProfanityDetector {
    constructor(profanities=defaultProfanities) {
        this.profanities = profanities.map(profanity => {
            const regexFormatted = profanity.split('').reduce((word, letter) => {
                if (replaceChars[letter] === undefined) {
                    return word+letter
                } else {
                    return word+`[${replaceChars[letter].join('')}${letter}]`
                }
            }, '')
            return new RegExp(regexFormatted, 'i')
        })
    }

    extract(string) {
        for (const regexp of this.profanities) {
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
