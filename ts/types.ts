// Kamil Postaağası, 2023501030
// What only TypeScript adds (topics T1 to T5). Run with `npx tsx ts/types.ts`.

// T1: inside a pattern, { x: something } is a RENAME, not a type.
const point = { x: 1, y: 2 }
const { x: horizontal } = point // x is renamed to horizontal
console.log('T1:', horizontal)
// Wrong idea: const { ticker: string } = stock  -> makes a VARIABLE called "string".
const stock = { ticker: 'THYAO', price: 280.5 }
const { ticker: string } = stock
console.log('T1 rename trap:', string)
// Right way: the type goes after the whole pattern.
const { ticker, price }: { ticker: string; price: number } = stock
console.log('T1 typed:', ticker, price)

// T2: tuple return type, and what "as const" does to an array.
function lastTrade(): [number, string] {
  return [44.1, 'ASELS']
}
const [tradePrice, tradeTicker] = lastTrade() // number, string
console.log('T2 tuple:', tradePrice, tradeTicker)
const loose = [44.1, 'ASELS'] // type (string | number)[] -> each item string | number | undefined
const fixed = [44.1, 'ASELS'] as const // type readonly [44.1, "ASELS"]
const [p1] = loose
const [p2, t2] = fixed // p2: 44.1, t2: "ASELS" (exact literal types)
console.log('T2 as const:', typeof p1, p2, t2)

// T3: noUncheckedIndexedAccess. From a string[] the first item is string | undefined.
const watchlist: string[] = ['KCHOL', 'SISE']
const [first] = watchlist // string | undefined
console.log('T3:', first !== undefined ? first.toLowerCase() : 'empty list')
const [firstOfEmpty = 'none'] = [] as string[] // a default removes undefined
console.log('T3 default:', firstOfEmpty)

// T4: optional fields and defaults change the variable type.
type Alert = { ticker: string; limit?: number }
const alert: Alert = { ticker: 'BIMAS' }
const { limit } = alert // number | undefined
const { limit: limitOrZero = 0 } = alert // number
console.log('T4:', limit, limitOrZero)

// T5: a compile error caused by destructuring, kept on purpose with @ts-expect-error.
const quote: { bid: number; ask: number } = { bid: 39.9, ask: 40.15 }
// @ts-expect-error Property 'last' does not exist on type '{ bid: number; ask: number; }'.
const { last } = quote
console.log('T5:', last) // at run time it is just undefined
// Fix: add the field to the type as optional, or give it a default.
const quote2: { bid: number; ask: number; last?: number } = quote
const { last: lastFixed = quote2.bid } = quote2
console.log('T5 fixed:', lastFixed)
