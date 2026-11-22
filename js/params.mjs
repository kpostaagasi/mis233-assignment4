// Kamil Postaağası, 2023501030
// Destructuring in parameters and loops (forms 11 and 12). Run with `node js/params.mjs`.

// Form 11: an options object in the parameter list, with defaults.
// "= {}" at the end means calling with no argument does not crash.
function placeOrder({ ticker, side = 'buy', qty = 1 } = {}) {
  return `${side} ${qty} x ${ticker}`
}
console.log('form 11:', placeOrder({ ticker: 'BIMAS', qty: 5 }))
console.log('form 11b:', placeOrder()) // works, ticker is just undefined

// Form 11c: the same idea with an array parameter.
const spread = ([bid, ask]) => +(ask - bid).toFixed(2)
console.log('form 11c:', spread([39.9, 40.15]))

// Form 12: patterns in loops, over Object.entries and over a Map.
const grades = { 'MIS 233': 'AA', 'INTT 321': 'BA' }
for (const [course, grade] of Object.entries(grades)) {
  console.log('form 12:', course, grade)
}
const weights = new Map([['ASELS', 0.4], ['THYAO', 0.35], ['BIMAS', 0.25]])
for (const [stock, weight] of weights) {
  console.log('form 12b:', stock, weight)
}
