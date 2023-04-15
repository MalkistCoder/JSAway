# JSAway

![npm](https://img.shields.io/npm/dw/jsaway) ![npm](https://img.shields.io/npm/v/jsaway) ![NPM](https://img.shields.io/npm/l/jsaway) ![GitHub Repo stars](https://img.shields.io/github/stars/MalkistCoder/JSAway)

JS Away is a simple swear filter that was inspired by [GoAway](https://github.com/TwiN/go-away/) by [TwiN](https://github.com/TwiN/).

Bad words are sourced from [chucknorris-io](https://github.com/chucknorris-io/)/[swear-words](https://github.com/chucknorris-io/swear-words/blob/master/es)

## Installation

Go into your terminal and type:

```powershell
npm install --save jsaway
```

## Usage

First, import the `ProfanityDetector` class.

```js
import ProfanityDetector from 'jsaway'
```

Then, make a variable using the class.

```js
const profDetector = new ProfanityDetector()
```

From here, you can use simple functions to find and detect profanity in text.

```js
profDetector.has('fuck') // true
profDetector.extract('fuck you.') // 'fuck'
profDetector.extractAll('fuck you ass piece of shit') // ['fuck', 'ass', 'shit ']
```

JSAway also supports basic leetspeak detection (for example, "t3st" will still be detected).

```js
profDetector.has('$h1+') // true
profDetector.extract('i love eating $h1+') // '$h1+'
```

You can also use the `.bounds()` function to find the slice that contains the profanity.

```js
const profanityBounds = profDetector.bounds('piece of shit') // [9, 13]
'piece of shit'.slice(...profanityBounds) // 'shit'
```

JSAway can also censor your strings, using the `.censor()` method.

The second argument is the `censorCharacter`, or the character you want to censor with.

The third argument is `includeFirstLetter`, which includes the first letter of the profanity.

The fourth argument is `includeLastLetter`, which is like `includeFirstLetter`, but for the last letter of the profanity.

```js
profDetector.censor('Fuck you. Fuck this shit.') // **** you. **** this ****.
profDetector.censor('Fuck you. Fuck this shit.', '-', true) // F--- you. F--- this s---.
profDetector.censor('Fuck you. Fuck this shit.', '•', true, true) // F••k you. F••k this s••t.
```

## Customization

JSAway can be customized to only block certain profanities. You can do this buy either editing the list of default profanities, or by creating your own.

To add and remove profanities from the default profanities (see profanities.json for the full list), you can use the `ProfanityDetector.addProfanity` and `ProfanityDetector.removeProfanity` functions.

```js
profDetector.addProfanity('test')
profDetector.has('test') // test
profDetector.extract('t3s+') // 't3s+'

profDetector.removeProfanity('test')
profDetector.extract('test') // null
```

You can also make your entire own list of profanities by simply editing the `ProfanityDetector.profanities` array.

```js
profDetector.profanities = ['test', 'words']
profDetector.has('test') // true
profDetector.extract('t3s+') // 't3s+'
```

## Example Usage

Message contains blocked words

```js
import ProfanityDetector from 'jsaway'

const profDetector = new ProfanityDetector()

let message = 'Hello there!'
if (!profDetector.has(message)) {
    console.log(message)
} else {
    console.log(`Your message contains blocked words: 
    ${profDetector.extractAll(message).join(', ').slice(0, -2)}`)
}
```
