// Kamil Postaağası, 2023501030
// Object destructuring (forms 5 to 10). Run with `node js/objects.mjs`.
// My data: one position in my portfolio.

const position = {
  ticker: 'ASELS',
  shares: 120,
  avgCost: 58.4,
  owner: { name: 'Kamil', account: 'Midas' },
  trades: [55.0, 61.8],
}

// Form 5: take properties by name (order does not matter).
let { ticker, shares } = position
console.log('form 5:', ticker, shares)
shares = shares + 10 // let, so I can change my copy; position.shares stays 120
console.log('form 5b:', shares, position.shares)

// Form 6: rename while you take it. Left of the colon = property, right = new variable.
const { avgCost: costPerShare } = position
console.log('form 6:', costPerShare)

// Form 7: default value when the property is missing (undefined).
const { stopLoss = 50, shares: qty = 0 } = position
console.log('form 7:', stopLoss, qty) // stopLoss is missing -> 50, shares exists -> 120

// Form 8: rest in an object, everything I did not name goes into a new object.
const { owner, trades, ...summary } = position
console.log('form 8:', summary)

// Form 9: nested patterns, an object inside an object and an array inside an object.
const { owner: { name }, trades: [firstBuy] } = position
console.log('form 9:', name, firstBuy) // note: no variable called owner or trades is made here

// Form 10: computed key, the property name comes from a variable.
const field = 'ticker'
const { [field]: chosen } = position
console.log('form 10:', field, '->', chosen)
