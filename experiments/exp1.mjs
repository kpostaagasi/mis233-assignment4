// Kamil Postaağası, 2023501030
// Experiment 1: pitfalls.mjs with the parentheses removed from the assignment. Run: node experiments/exp1.mjs

// Pitfall 1: destructuring undefined or null throws a TypeError.
try {
  const { a } = undefined
  console.log(a)
} catch (error) {
  console.log('pitfall 1:', error.constructor.name, '-', error.message)
}

// Pitfall 2: a default only applies to undefined, not to null.
const { note = 'no note' } = { note: null }
const { note: note2 = 'no note' } = { note: undefined }
console.log('pitfall 2:', note, '|', note2)

// Pitfall 3: assigning without const/let needs parentheses.
// "{ a } = obj" at the start of a line is read as a block -> SyntaxError.
let price
{ price } = { price: 44.1 } // EXPERIMENT: no parentheses
console.log('pitfall 3:', price)
try {
  new Function('let a; { a } = { a: 1 }') // build that wrong line on purpose
} catch (error) {
  console.log('pitfall 3b:', error.constructor.name, '-', error.message)
}

// Pitfall 4: it copies references, not deep copies. Nested objects are shared.
const order = { ticker: 'KCHOL', meta: { note: 'first' } }
const { meta } = order
meta.note = 'changed'
console.log('pitfall 4:', order.meta.note) // the original changed too
const { ...copy } = order
console.log('pitfall 4b:', copy.meta === order.meta) // rest is a shallow copy

// Pitfall 5: in objects order does not matter, in arrays it does.
const { b, a } = { a: 1, b: 2 }
const [y, x] = [1, 2]
console.log('pitfall 5:', 'object a =', a, 'b =', b, '| array x =', x, 'y =', y)
