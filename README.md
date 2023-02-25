# JSAway

![npm](https://img.shields.io/npm/dw/jsaway) ![npm](https://img.shields.io/npm/v/jsaway) ![NPM](https://img.shields.io/npm/l/jsaway) ![GitHub Repo stars](https://img.shields.io/github/stars/MalkistCoder/JSAway)

JS Away is a simple swear filter that was inspired by [GoAway](https://github.com/TwiN/go-away/) by [TwiN](https://github.com/TwiN/).

## Installation

Go into your terminal and type:

```
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
```

JSAway also supports basic leetspeak detection (for example, "t3st" will still be detected).

```js
profDetector.has('$h1+') // true
profDetector.extract('i love eating $h1+') // '$h1+'
```

### Customization

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

## Examples

```js
import ProfanityDetector from 'jsaway'

const profDetector = new ProfanityDetector()

let message = 'Hello there!'
if (!profDetector.has(message)) {
    console.log(message)
} else {
    console.log(`Your message contains blocked words. ${profDetector.extract(message)}`)
}
```
