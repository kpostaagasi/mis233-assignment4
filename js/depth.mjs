// Kamil Postaağası, 2023501030
// Bonus 2: Depth. Experiments beyond the twelve forms. Run with `node js/depth.mjs`.

// D1: array patterns work on every iterable, not only arrays.
const [c1, c2, ...restChars] = 'BIST'
console.log('D1 string:', c1, c2, restChars)
const [firstTicker] = new Set(['ASELS', 'ASELS', 'THYAO'])
console.log('D1 Set:', firstTicker)
const [[k, v]] = new Map([['USDTRY', 34.2]])
console.log('D1 Map:', k, v)
function* prices() {
  yield 40
  yield 41
  yield 42
}
const [p1, p2] = prices()
console.log('D1 generator:', p1, p2)

// D2: what does an array pattern really call? Symbol.iterator, then next() only as needed.
const spy = {
  [Symbol.iterator]() {
    console.log('D2 Symbol.iterator called')
    let i = 0
    return {
      next() {
        i++
        console.log('D2 next() call', i)
        return { value: i * 10, done: i > 5 }
      },
      return() {
        console.log('D2 return() called (iterator closed early)')
        return { done: true }
      },
    }
  },
}
const [a, b] = spy
console.log('D2 result:', a, b)
try {
  const [x] = { 0: 'not iterable', length: 1 } // array-like but not iterable
  console.log(x)
} catch (error) {
  console.log('D2 array-like:', error.constructor.name, '-', error.message)
}

// D3: order of evaluation. A default is computed only when needed, left to right,
// and it can use a variable from earlier in the same pattern.
function fallback(name) {
  console.log('D3 default computed for', name)
  return 0
}
const { bid = fallback('bid'), ask = fallback('ask') } = { bid: 39.9 }
console.log('D3 result:', bid, ask)
const [low = 1, high = low * 2] = []
console.log('D3 uses earlier variable:', low, high)
try {
  new Function('const [x = y, y = 1] = []; return x')()
} catch (error) {
  console.log('D3 later variable:', error.constructor.name, '-', error.message)
}

// D4: destructuring in other places.
try {
  JSON.parse('{ broken')
} catch ({ name, message }) {
  console.log('D4 catch:', name, '-', message)
}
const portfolio = { ASELS: 120, THYAO: 40 }
for (const key in portfolio) console.log('D4 for...in gives keys:', key)
for (const [key, qty] of Object.entries(portfolio)) console.log('D4 for...of entries:', key, qty)
const target = {}
;[target.min, target.max] = [39.8, 43.5] // assignment targets can be properties
console.log('D4 assignment targets:', target)
const list = []
;({ a: list[0], b: list[1] } = { a: 'x', b: 'y' })
console.log('D4 into array slots:', list)

// D5: readability. A deep pattern vs. a two-step version.
const report = { meta: { source: { name: 'BIST', updated: { day: 22, month: 11 } } } }
const { meta: { source: { name: srcName, updated: { day, month } } } } = report
console.log('D5 deep:', srcName, day, month)
const { source } = report.meta
const { updated } = source
console.log('D5 two steps:', source.name, updated.day, updated.month)
