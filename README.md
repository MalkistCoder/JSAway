# JSAway

JS Away is a simple swear filter that was inspired by [GoAway](https://github.com/TwiN/go-away/) by [TwiN](https://github.com/TwiN/).

## Installation

`npm install --save jsaway`

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

JSAway also supports basic leetspeak detection (for example, "p00p" will still be detected).

```js
profDetector.has('$h1+') // true
profDetector.extract('i love eating $h1+') // '$h1+'
```
