// Kamil Postaağası, 2023501030
// Forms 11 and 12 in TypeScript, and the typing rules for patterns in parameters.

type OrderInput = { ticker?: string; side?: 'buy' | 'sell'; qty?: number }

// Form 11: the type goes AFTER the whole pattern, the default "= {}" after the type.
function placeOrder({ ticker = '???', side = 'buy', qty = 1 }: OrderInput = {}): string {
  return `${side} ${qty} x ${ticker}`
}
console.log('form 11:', placeOrder({ ticker: 'BIMAS', qty: 5 }))
console.log('form 11b:', placeOrder())

// Form 11c: an array (tuple) parameter.
const spread = ([bid, ask]: [number, number]): number => +(ask - bid).toFixed(2)
console.log('form 11c:', spread([39.9, 40.15]))

// Form 12: loops. Object.entries gives [string, V][]; a Map<K, V> gives [K, V] pairs.
const grades: Record<string, string> = { 'MIS 233': 'AA', 'INTT 321': 'BA' }
for (const [course, grade] of Object.entries(grades)) {
  console.log('form 12:', course, grade)
}
const weights = new Map<string, number>([['ASELS', 0.4], ['THYAO', 0.35], ['BIMAS', 0.25]])
for (const [stock, weight] of weights) {
  console.log('form 12b:', stock, (weight * 100).toFixed(0) + '%')
}
