// Kamil Postaağası, 2023501030
// Experiment 3: props.tsx with the first rejected P7 line turned back on. Run: npx tsc -p experiments/tsconfig.exp3.json
import type { ComponentProps, PropsWithChildren, ReactElement, ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
const show = (label: string, el: ReactElement) => console.log(label, renderToStaticMarkup(el))

// P1: one props object. The type goes after the whole pattern.
type CardProps = { title: string; children?: ReactNode }
function CardA(props: CardProps) {
  return <section><h2>{props.title}</h2>{props.children}</section>
}
function Card({ title, children }: CardProps) {
  return <section><h2>{title}</h2>{children}</section>
}
show('P1 A:', <CardA title="Portfolio">3 positions</CardA>)
show('P1 B:', <Card title="Portfolio">3 positions</Card>)

// P2: children is only a prop.
show('P2 tags:', <Card title="Note">between tags</Card>)
show('P2 attr:', <Card title="Note" children="as attribute" />)

// P3: what children can be. ReactNode accepts all of these.
function Box({ children }: { children?: ReactNode }) {
  return <div>{children}</div>
}
const kinds: [string, ReactNode][] = [
  ['string', 'hello'],
  ['number', 42],
  ['element', <b>bold</b>],
  ['undefined', undefined],
  ['null', null],
  ['false', false],
]
for (const [label, node] of kinds) show(`P3 ${label}:`, <Box>{node}</Box>)
// A function is NOT a ReactNode; it needs its own children type (render prop).
function PriceTag({ price, children }: { price: number; children: (p: number) => ReactNode }) {
  return <p>{children(price)}</p>
}
show('P3 function:', <PriceTag price={44.1}>{(p) => `Price: ${p} TL`}</PriceTag>)

// P4: rest props typed with ComponentProps<'section'>, spread onto the DOM element.
type PanelProps = { title: string } & ComponentProps<'section'>
function Panel({ title, children, ...rest }: PanelProps) {
  return <section {...rest}><h3>{title}</h3>{children}</section>
}
show('P4 rest:', <Panel title="Risk" id="risk" className="card">low</Panel>)
function PanelLast({ children, ...rest }: ComponentProps<'section'>) {
  return <section className="fixed" {...rest}>{children}</section> // caller's className wins
}
show('P4 order:', <PanelLast className="mine">x</PanelLast>)

// P5: props or children, the same layout twice.
type LayoutProps = { header: ReactNode; body: ReactNode; footer: ReactNode }
function LayoutProps({ header, body, footer }: LayoutProps) {
  return <article><header>{header}</header><main>{body}</main><footer>{footer}</footer></article>
}
function LayoutChildren({ children }: PropsWithChildren) {
  return <article>{children}</article>
}
show('P5 props:', <LayoutProps header="Weekly report" body="Up 2%" footer="Source: BIST" />)
show('P5 children:', (
  <LayoutChildren>
    <header>Weekly report</header><main>Up 2%</main><footer>Source: BIST</footer>
  </LayoutChildren>
))

// P6: default with form 7. label?: string | null so I can pass null on purpose.
function Badge({ label = 'n/a' }: { label?: string | null }) {
  return <span>[{label}]</span>
}
show('P6 undefined:', <Badge label={undefined} />)
show('P6 null:', <Badge label={null} />)

// P7: three ways to type children.
// a) children?: ReactNode written by hand (Card above).
// b) PropsWithChildren<P> adds children?: ReactNode to P.
type TitledProps = PropsWithChildren<{ title: string }>
function Titled({ title, children }: TitledProps) {
  return <div><em>{title}</em>{children}</div>
}
show('P7 PropsWithChildren:', <Titled title="Watchlist">KCHOL, SISE</Titled>)
// c) ComponentProps<'button'> = every prop a real <button> accepts (onClick, disabled, type, ...).
function BuyButton(props: ComponentProps<'button'>) {
  return <button type="button" {...props} />
}
show('P7 ComponentProps:', <BuyButton disabled>Buy</BuyButton>)
// What the compiler rejects. These lines are commented out because the only allowed
// suppression in this assignment is the one in T5. Remove the // to see each error
// (messages copied from `npm run check`):
show('P7 reject 1:', <Card>no title</Card>) // EXPERIMENT
//   TS2741: Property 'title' is missing in type '{ children: string; }' but required in type 'CardProps'.
// show('P7 reject 2:', <Card title={123} />)
//   TS2322: Type 'number' is not assignable to type 'string'.
// show('P7 reject 3:', <Box>{() => 'x'}</Box>)
//   TS2322: Type '() => string' is not assignable to type 'ReactNode'.
// show('P7 reject 4:', <BuyButton colour="red">Sell</BuyButton>)
//   TS2322: ... Property 'colour' does not exist on type '... ButtonHTMLAttributes<HTMLButtonElement>'. Did you mean 'color'?
