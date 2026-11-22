// Kamil Postaağası, 2023501030
// Bonus 2: Depth, TypeScript at the type level. Run with `npx tsx ts/depth.tsx`.
import type { ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

// D6: "destructuring" types with infer, the same idea as [first, ...rest] but for types.
type First<T extends readonly unknown[]> = T extends readonly [infer F, ...unknown[]] ? F : never
type Rest<T extends readonly unknown[]> = T extends readonly [unknown, ...infer R] ? R : []
type Quote = [ticker: string, price: number, volume: number]
type QuoteTicker = First<Quote> // string
type QuoteNumbers = Rest<Quote> // [price: number, volume: number]
const t: QuoteTicker = 'ASELS'
const nums: QuoteNumbers = [58.4, 1200]
console.log('D6 First/Rest:', t, nums)

// Object version: pull the type of one property out with infer.
type OwnerOf<T> = T extends { owner: infer O } ? O : never
type Pos = { ticker: string; owner: { name: string; account: string } }
const o: OwnerOf<Pos> = { name: 'Kamil', account: 'Midas' }
console.log('D6 OwnerOf:', o)

// D7: Parameters<F> gives the parameter list as a tuple, so I can destructure its type.
function placeOrder(ticker: string, qty: number, side: 'buy' | 'sell' = 'buy') {
  return `${side} ${qty} x ${ticker}`
}
type OrderArgs = Parameters<typeof placeOrder> // [ticker: string, qty: number, side?: 'buy' | 'sell']
const args: OrderArgs = ['THYAO', 3]
const [ticker, qty] = args
console.log('D7 Parameters:', ticker, qty, '->', placeOrder(...args))

// D8: a generic component. The type of `items` decides the type of `render`'s argument.
type ListProps<T> = { items: T[]; render: (item: T) => ReactNode }
function List<T>({ items, render }: ListProps<T>) {
  return <ul>{items.map((item, i) => <li key={i}>{render(item)}</li>)}</ul>
}
const holdings = [{ ticker: 'ASELS', qty: 120 }, { ticker: 'THYAO', qty: 40 }]
console.log('D8 generic component:', renderToStaticMarkup(
  <List items={holdings} render={({ ticker, qty }) => `${ticker}: ${qty}`} />,
))
