// Kamil Postaağası, 2023501030
// Props and children in plain JavaScript (JSX). Run with `npx tsx js/props.jsx`.
import { renderToStaticMarkup } from 'react-dom/server'
const show = (label, el) => console.log(label, renderToStaticMarkup(el))

// P1: props is ONE object. CardA reads it with a dot, CardB takes it apart in the
// parameter (form 5 inside a parameter = form 11).
function CardA(props) {
  return <section><h2>{props.title}</h2>{props.children}</section>
}
function CardB({ title, children }) {
  return <section><h2>{title}</h2>{children}</section>
}
show('P1 A:', <CardA title="Portfolio">3 positions</CardA>)
show('P1 B:', <CardB title="Portfolio">3 positions</CardB>)
// Proof that it is one object: log what the component receives.
function Spy(props) {
  console.log('P1 props object:', Object.keys(props))
  return null
}
renderToStaticMarkup(<Spy ticker="ASELS" qty={3}>child text</Spy>)

// P2: children is only a prop. Content between the tags and children="..." are the same.
show('P2 tags   :', <CardB title="Note">between tags</CardB>)
show('P2 attr   :', <CardB title="Note" children="as attribute" />)
// Both at once: JSX content between the tags wins over the attribute.
show('P2 both   :', <CardB title="Note" children="attribute">tags</CardB>)

// P3: what children can be.
function Box({ children }) {
  return <div>{children}</div>
}
show('P3 string   :', <Box>hello</Box>)
show('P3 number   :', <Box>{42}</Box>)
show('P3 zero     :', <Box>{0}</Box>)
show('P3 element  :', <Box><b>bold</b></Box>)
show('P3 several  :', <Box><i>a</i><i>b</i></Box>)
show('P3 array    :', <Box>{['x', 'y'].map((s) => <span key={s}>{s}</span>)}</Box>)
show('P3 undefined:', <Box>{undefined}</Box>)
show('P3 null     :', <Box>{null}</Box>)
show('P3 false    :', <Box>{false}</Box>)
show('P3 true     :', <Box>{true}</Box>)
// A function as children: React cannot render a function directly,
// but the component can CALL it (render prop pattern).
function PriceTag({ price, children }) {
  return <p>{children(price)}</p>
}
show('P3 function :', <PriceTag price={44.1}>{(p) => `Price: ${p} TL`}</PriceTag>)
try {
  show('P3 fn raw   :', <Box>{() => 'x'}</Box>)
} catch (error) {
  console.log('P3 fn raw   : threw', error.constructor.name)
}

// P4: separate children from the other props, spread the rest onto a DOM element.
function Panel({ title, children, ...rest }) {
  return <section {...rest}><h3>{title}</h3>{children}</section>
}
show('P4 rest     :', <Panel title="Risk" id="risk" className="card">low</Panel>)
// Order decides who wins: the later one overwrites the earlier one.
function PanelA({ children, ...rest }) {
  return <section {...rest} className="fixed">{children}</section> // explicit after spread: fixed wins
}
function PanelB({ children, ...rest }) {
  return <section className="fixed" {...rest}>{children}</section> // spread after: caller wins
}
show('P4 spread first :', <PanelA className="mine">x</PanelA>)
show('P4 spread last  :', <PanelB className="mine">x</PanelB>)
// key is not a prop: React takes it and the component never sees it.
function KeySpy(props) {
  return <span>{String(props.key)}</span>
}
show('P4 key      :', <KeySpy key="k1" />)

// P5: props or children? The same layout twice.
function LayoutProps({ header, footer, body }) {
  return <article><header>{header}</header><main>{body}</main><footer>{footer}</footer></article>
}
function LayoutChildren({ children }) {
  return <article>{children}</article>
}
show('P5 props    :', <LayoutProps header="Weekly report" body="Up 2%" footer="Source: BIST" />)
show('P5 children :', (
  <LayoutChildren>
    <header>Weekly report</header><main>Up 2%</main><footer>Source: BIST</footer>
  </LayoutChildren>
))

// P6: a default for a prop with form 7. undefined uses the default, null does not.
function Badge({ label = 'n/a' }) {
  return <span>[{label}]</span>
}
show('P6 missing  :', <Badge />)
show('P6 undefined:', <Badge label={undefined} />)
show('P6 null     :', <Badge label={null} />)
show('P6 value    :', <Badge label="BUY" />)

// P7 is about types, so it is in ts/props.tsx. Here: plain JS lets anything through.
show('P7 (js, no types):', <CardB title={123}>{4}</CardB>)
