// Kamil Postaağası, 2023501030
// The same six object forms as js/objects.mjs, now typed. Run with `npx tsx ts/objects.ts`.

type Owner = { name: string; account: string }
type Position = {
  ticker: string
  shares: number
  avgCost: number
  stopLoss?: number // optional field
  owner: Owner
  trades: number[]
}

const position: Position = {
  ticker: 'ASELS',
  shares: 120,
  avgCost: 58.4,
  owner: { name: 'Kamil', account: 'Midas' },
  trades: [55.0, 61.8],
}

// Form 5: types come from Position, no annotation needed on the pattern.
let { ticker, shares } = position
shares = shares + 10
console.log('form 5:', ticker, shares, position.shares)

// Form 6: rename. costPerShare is a number (NOT a type annotation, see ts/types.ts T1).
const { avgCost: costPerShare } = position
console.log('form 6:', costPerShare)

// Form 7: default on an optional field: stopLoss becomes number, not number | undefined.
const { stopLoss = 50 } = position
console.log('form 7:', stopLoss)

// Form 8: rest. summary has type { ticker; shares; avgCost; stopLoss? }.
const { owner, trades, ...summary } = position
console.log('form 8:', summary, '| owner was', owner.name, '| trades', trades.length)

// Form 9: nested. firstBuy is number | undefined because trades could be empty.
const { owner: { name }, trades: [firstBuy] } = position
console.log('form 9:', name, firstBuy ?? 'no trades')

// Form 10: computed key. keyof Position keeps it type-safe.
const field: 'ticker' = 'ticker'
const { [field]: chosen } = position // chosen: string
console.log('form 10:', field, '->', chosen)
