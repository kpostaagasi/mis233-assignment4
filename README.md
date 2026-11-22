# Destructuring Field Guide

Name: Kamil Postaağası  
Student number: 2023501030

Bonuses claimed: **Bonus 1: LaTeX**, **Bonus 2: Depth**, **Bonus 3: Real code**, **Bonus 4: Git repository** (see the sections at the end).

## Run

```
npm install
npm run all      # runs the JS and TS examples (output is in output.txt)
npm run check    # type-checks in strict mode
```

My examples use my own data: BIST stock prices, my portfolio positions, my courses this term.
Every output below is copied from `output.txt` (`npm run all > output.txt`).

## Field guide

### Form 1: values by position, `const [x, y] = f()`

**Syntax:** `const [lowest, highest] = minMax(closes)`

**Example** (`js/arrays.mjs`):

```js
const closes = [41.2, 39.8, 43.5, 40.1]
const [lowest, highest] = minMax(closes)
console.log('form 1:', lowest, highest)
```

**Output:** `form 1: 39.8 43.5`

**Use it when:** a function gives back a few values in a fixed order (like `useState` does).

**Watch out:** only the position counts, not the name. If I write `[highest, lowest]` the
names are swapped but the values are not. Without destructuring it is
`const pair = minMax(closes); const lowest = pair[0]; const highest = pair[1]`.

### Form 2: skip and collect, `const [, second, ...others] = list`

**Syntax:** `const [, secondCourse, ...otherCourses] = courses`

**Example** (`js/arrays.mjs`):

```js
const courses = ['MIS 233', 'INTT 321', 'MIS 251', 'INTT 375']
const [, secondCourse, ...otherCourses] = courses
```

**Output:** `form 2: INTT 321 [ 'MIS 251', 'INTT 375' ]`

**Use it when:** I want one item from a known place and "the rest" as a list.

**Watch out:** the rest element must be last (`[...a, b]` is a SyntaxError). `...` here is
*rest* (it collects into a new array); in `[...list]` on the right side it is *spread*
(it unpacks). Same three dots, opposite jobs.

### Form 3: swap, `[a, b] = [b, a]`

**Syntax:** `[buy, sell] = [sell, buy]`

**Example** (`js/arrays.mjs`):

```js
let buy = 'AKBNK'
let sell = 'GARAN'
;[buy, sell] = [sell, buy]
```

**Output:** `form 3: GARAN AKBNK`

**Use it when:** two variables need to trade values, no temp variable needed.

**Watch out:** the variables must be `let`. If the line before has no semicolon, JavaScript
glues `[` to it (`sell = 'GARAN'[buy, sell] = ...`), so I start the line with `;`.

### Form 4: array defaults, `const [a = 1, b = 2] = []`

**Syntax:** `const [currency = 'TRY', amount = 0] = []`

**Example** (`js/arrays.mjs`):

```js
const [currency = 'TRY', amount = 0] = []
const [cur2 = 'TRY', amt2 = 0] = ['USD', undefined]
```

**Output:** `form 4: TRY 0` and `form 4b: USD 0`

**Use it when:** the array can be shorter than I expect.

**Watch out:** the default is used only for `undefined` (missing or written as undefined),
not for `null`, `0` or `''`.

### Form 5: properties by name, `let { a, b } = t`

**Syntax:** `let { ticker, shares } = position`

**Example** (`js/objects.mjs`):

```js
let { ticker, shares } = position
shares = shares + 10
console.log('form 5b:', shares, position.shares)
```

**Output:** `form 5: ASELS 120` and `form 5b: 130 120`

**Use it when:** I need a few fields of an object and want short names.

**Watch out:** the variable name must match the property name. Changing `shares` changes
only my variable, the object still has 120 (for a primitive value; see pitfall 4 for objects).

### Form 6: rename, `const { a: alpha } = t`

**Syntax:** `const { avgCost: costPerShare } = position`

**Example** (`js/objects.mjs`):

```js
const { avgCost: costPerShare } = position
console.log('form 6:', costPerShare)
```

**Output:** `form 6: 58.4`

**Use it when:** the property name is unclear here or already used by another variable.

**Watch out:** after this there is no `avgCost` variable, only `costPerShare`. Left of the
colon is where it comes from, right of the colon is the new name. In TypeScript this looks
like a type annotation but it is not (topic T1).

### Form 7: object defaults, `const { a = 1 } = t`

**Syntax:** `const { stopLoss = 50, shares: qty = 0 } = position`

**Example** (`js/objects.mjs`):

```js
const { stopLoss = 50, shares: qty = 0 } = position
```

**Output:** `form 7: 50 120`

**Use it when:** an optional setting should have a sensible value.

**Watch out:** `shares` exists (120), so its default 0 is ignored. Rename and default can be
combined: `shares: qty = 0`. Again only `undefined` triggers the default (pitfall 2).

### Form 8: rest in an object, `const { a, ...others } = t`

**Syntax:** `const { owner, trades, ...summary } = position`

**Example** (`js/objects.mjs`):

```js
const { owner, trades, ...summary } = position
console.log('form 8:', summary)
```

**Output:** `form 8: { ticker: 'ASELS', shares: 120, avgCost: 58.4 }`

**Use it when:** I want to remove a few fields and keep everything else, for example taking
`children` out of props and passing the rest on (P4).

**Watch out:** `summary` is a new object but only a shallow copy (pitfall 4). Rest must be last.

### Form 9: nested, `const { p: { x }, list: [first] } = t`

**Syntax:** `const { owner: { name }, trades: [firstBuy] } = position`

**Example** (`js/objects.mjs`):

```js
const { owner: { name }, trades: [firstBuy] } = position
```

**Output:** `form 9: Kamil 55`

**Use it when:** the data I need is one or two levels deep.

**Watch out:** this does not create `owner` or `trades` variables, they are only the path.
If `owner` is undefined it throws a TypeError. Deep patterns get hard to read fast.

### Form 10: computed key, `const { [key]: value } = t`

**Syntax:** `const { [field]: chosen } = position`

**Example** (`js/objects.mjs`):

```js
const field = 'ticker'
const { [field]: chosen } = position
```

**Output:** `form 10: ticker -> ASELS`

**Use it when:** the property name is only known at run time (a column chosen by the user).

**Watch out:** a computed key always needs a new name after the colon (`{ [field] }` alone is
a SyntaxError). Plain version: `const chosen = position[field]`.

### Form 11: patterns in parameters, `function f({ a = 1, b }: Options = {})`

**Syntax:** `function placeOrder({ ticker, side = 'buy', qty = 1 } = {})`

**Example** (`js/params.mjs`):

```js
function placeOrder({ ticker, side = 'buy', qty = 1 } = {}) {
  return `${side} ${qty} x ${ticker}`
}
placeOrder({ ticker: 'BIMAS', qty: 5 })
placeOrder()
const spread = ([bid, ask]) => +(ask - bid).toFixed(2)
```

**Output:** `form 11: buy 5 x BIMAS`, `form 11b: buy 1 x undefined`, `form 11c: 0.25`

**Use it when:** a function has many options; the caller can pass them in any order. React
components are exactly this (P1).

**Watch out:** without `= {}` at the end, `placeOrder()` throws "Cannot destructure property
'ticker' of 'undefined'". In TypeScript the type goes after the pattern: `({ ... }: OrderInput = {})`.

### Form 12: patterns in loops, `for (const [k, v] of Object.entries(o))`

**Syntax:** `for (const [stock, weight] of weights)`

**Example** (`js/params.mjs`):

```js
for (const [course, grade] of Object.entries(grades)) { ... }
const weights = new Map([['ASELS', 0.4], ['THYAO', 0.35], ['BIMAS', 0.25]])
for (const [stock, weight] of weights) { ... }
```

**Output:**

```
form 12: MIS 233 AA
form 12: INTT 321 BA
form 12b: ASELS 0.4
form 12b: THYAO 0.35
form 12b: BIMAS 0.25
```

**Use it when:** looping over key/value pairs.

**Watch out:** `Object.entries` gives `[key, value]` arrays, so the pattern is an *array*
pattern, not `{ key, value }`. A Map already iterates as `[key, value]` pairs.

## Pitfalls

All from `js/pitfalls.mjs`.

| # | Code | Real output | Why it happens |
|---|------|-------------|----------------|
| 1 | `const { a } = undefined` | `pitfall 1: TypeError - Cannot destructure property 'a' of 'undefined' as it is undefined.` | Destructuring reads properties of the value, and `undefined`/`null` have no properties. |
| 2 | `const { note = 'no note' } = { note: null }` | `pitfall 2: null \| no note` | Defaults only replace `undefined`; `null` is a real value, so it is kept. |
| 3 | `let a; { a } = { a: 1 }` | `pitfall 3b: SyntaxError - Unexpected token '='` | A line starting with `{` is parsed as a block, so `=` makes no sense. `({ price } = obj)` works (`pitfall 3: 44.1`). |
| 4 | `const { meta } = order; meta.note = 'changed'` | `pitfall 4: changed`, `pitfall 4b: true` | The variable points to the same nested object; rest (`...copy`) is a shallow copy too. |
| 5 | `const { b, a } = {a:1,b:2}` vs `const [y, x] = [1, 2]` | `pitfall 5: object a = 1 b = 2 \| array x = 2 y = 1` | Objects match by name, arrays by position. |

## Props and children

Code in `js/props.jsx` and `ts/props.tsx`, rendered with `renderToStaticMarkup`.

### P1: props is one object

```jsx
function CardA(props) { return <section><h2>{props.title}</h2>{props.children}</section> }
function CardB({ title, children }) { return <section><h2>{title}</h2>{children}</section> }
```

```
P1 A: <section><h2>Portfolio</h2>3 positions</section>
P1 B: <section><h2>Portfolio</h2>3 positions</section>
P1 props object: [ 'ticker', 'qty', 'children' ]
```

React calls the component with ONE argument. `CardB` is form 5 (properties by name) used in a
parameter, which is form 11. The `Spy` component logs the keys of that one object: the JSX
attributes plus `children` for the text between the tags.

### P2: children is only a prop

```
P2 tags   : <section><h2>Note</h2>between tags</section>
P2 attr   : <section><h2>Note</h2>as attribute</section>
P2 both   : <section><h2>Note</h2>tags</section>
```

`<CardB>between tags</CardB>` and `<CardB children="as attribute" />` give the same HTML,
so `children` is a normal prop with a special JSX syntax. When I give both, the content between
the tags wins, because JSX puts it in `children` after the attributes.

### P3: what children can be

```
P3 string   : <div>hello</div>
P3 number   : <div>42</div>
P3 zero     : <div>0</div>
P3 element  : <div><b>bold</b></div>
P3 several  : <div><i>a</i><i>b</i></div>
P3 array    : <div><span>x</span><span>y</span></div>
P3 undefined: <div></div>
P3 null     : <div></div>
P3 false    : <div></div>
P3 true     : <div></div>
P3 function : <p>Price: 44.1 TL</p>
P3 fn raw   : <div></div>
```

Strings, numbers (also `0`!) and elements appear. `undefined`, `null`, `true` and `false`
render nothing, which is why `{cond && <X/>}` works, but `{count && ...}` prints `0` when count
is 0. A function cannot be rendered directly: React prints nothing and warns on stderr
"Functions are not valid as a React child". It works only if the component *calls*
`children(price)` (render prop).

### P4: separating children from the other props

```
P4 rest     : <section id="risk" class="card"><h3>Risk</h3>low</section>
P4 spread first : <section class="fixed">x</section>
P4 spread last  : <section class="mine">x</section>
P4 key      : <span>undefined</span>
```

`({ title, children, ...rest })` takes out what the component uses and passes the rest
(`id`, `className`) to the DOM element. JSX attributes are applied left to right, so the one
that comes later wins: `{...rest} className="fixed"` forces `fixed`, `className="fixed"
{...rest}` lets the caller override it. `key` never reaches the component; React warns
"`key` is not a prop. Trying to access it will result in `undefined` being returned".

### P5: props or children?

```
P5 props    : <article><header>Weekly report</header><main>Up 2%</main><footer>Source: BIST</footer></article>
P5 children : <article><header>Weekly report</header><main>Up 2%</main><footer>Source: BIST</footer></article>
```

Same HTML, two designs. With props (`header`, `body`, `footer`) the component controls the
structure and the caller cannot forget a part or put them in the wrong order. With children the
caller controls everything, which is more flexible but the component cannot enforce a layout.
I would use named props when there are fixed slots, and children for a wrapper (card, modal)
where the content is free.

### P6: defaults

```
P6 missing  : <span>[n/a]</span>
P6 undefined: <span>[n/a]</span>
P6 null     : <span>[]</span>
P6 value    : <span>[BUY]</span>
```

`function Badge({ label = 'n/a' })` is form 7 in a parameter. A missing prop and
`label={undefined}` get the default. `label={null}` does not, and since null renders nothing the
badge shows empty brackets on the screen.

### P7: types

```
P7 PropsWithChildren: <div><em>Watchlist</em>KCHOL, SISE</div>
P7 ComponentProps: <button type="button" disabled="">Buy</button>
```

- `children?: ReactNode` by hand: allows strings, numbers, elements, arrays, null, undefined,
  booleans. It rejects a function: `TS2322: Type '() => string' is not assignable to type 'ReactNode'.`
- `PropsWithChildren<{ title: string }>` = my props plus `children?: ReactNode`, less typing.
- `ComponentProps<'button'>` = every prop a real `<button>` accepts, so `disabled` works and a
  typo is caught: `Property 'colour' does not exist on type '... ButtonHTMLAttributes<HTMLButtonElement>'. Did you mean 'color'?`
- Missing required prop: `TS2741: Property 'title' is missing in type '{ children: string; }' but required in type 'CardProps'.`
- Wrong type: `TS2322: Type 'number' is not assignable to type 'string'.` In plain JS the same
  call just renders (`P7 (js, no types): <section><h2>123</h2>4</section>`).

The rejected lines are kept as comments in `ts/props.tsx`, because the only allowed
suppression is the one in T5.

## TypeScript topics (T1 to T5)

From `ts/types.ts`:

- **T1** `const { ticker: string } = stock` makes a variable called `string` (`T1 rename trap: THYAO`).
  The type goes after the pattern: `const { ticker, price }: { ticker: string; price: number } = stock`.
- **T2** A tuple return `[number, string]` gives each variable its own type. A normal array
  literal is `(string | number)[]`; with `as const` it becomes `readonly [44.1, "ASELS"]`, so
  `p2` has type `44.1` and `t2` has type `"ASELS"`.
- **T3** With `noUncheckedIndexedAccess`, `const [first] = watchlist` is `string | undefined`,
  so `first.toLowerCase()` does not compile until I check for undefined or add a default.
- **T4** `limit?: number` → `const { limit }` is `number | undefined` (`T4: undefined 0`);
  with `= 0` it becomes `number`.
- **T5** `const { last } = quote` when `last` is not in the type:
  `Property 'last' does not exist on type '{ bid: number; ask: number; }'.` (kept with
  `// @ts-expect-error`). Fix: add `last?: number` to the type, or give a default.

## JavaScript vs TypeScript

| Form | Same in TS | What I must add in TS | Error when wrong |
|------|-----------|------------------------|------------------|
| 1 `[x, y] = f()` | the pattern | a tuple return type `[number, number]` | without it each item is `number \| undefined` (noUncheckedIndexedAccess) |
| 2 `[, b, ...rest]` | the pattern | nothing, `rest` is `string[]` | `b` is `string \| undefined`, `b.toUpperCase()`: "TS18048: 'b' is possibly 'undefined'." |
| 3 swap | the pattern | compatible types for both variables | swapping a string and a number: "TS2322: Type 'number' is not assignable to type 'string'." |
| 4 array defaults | the pattern | optional tuple type `[string?, number?]` | `const [a4] = []` with no type: "TS2493: Tuple type '[]' of length '0' has no element at index '0'." |
| 5 `{ a, b }` | the pattern | object type (often inferred) | asking for a field that is not in the type: TS2339 "Property ... does not exist" |
| 6 rename | the pattern | the type after the pattern, not inside | `{ a: string }` silently renames to a variable `string` (T1) |
| 7 object defaults | the pattern | the field must be optional (`?`) | the default removes `undefined` from the type (T4) |
| 8 rest | the pattern | nothing, rest type is computed | using a removed field on the rest object: TS2339 |
| 9 nested | the pattern | nested types | inner array item is `T \| undefined` |
| 10 computed key | the pattern | key typed as `keyof T` or a literal | with a plain `string` key: "TS2537: Type '{ ticker: string; }' has no matching index signature for type 'string'." |
| 11 parameters | the pattern | `({ ... }: Type = {})` | missing required option: TS2345 / TS2741 |
| 12 loops | the pattern | `Map<string, number>` or a `Record` | `Object.entries` values are typed from the record type |

## Bonus 1: LaTeX

The whole guide is also written in LaTeX: `latex/guide.tex`, compiled to `latex/guide.pdf`.
It has a linked table of contents, code typeset with the `listings` package and real tables
(`booktabs`, `longtable`). Commands I used (run twice so the contents page is filled in):

```
cd latex
pdflatex -interaction=nonstopmode guide.tex
pdflatex -interaction=nonstopmode guide.tex
```

`latex/build.sh` regenerates `guide.tex` from this README with pandoc and then runs the two
commands above.

## Bonus 2: Depth

Code in `js/depth.mjs` and `ts/depth.tsx` (both run as part of `npm run all`).

### D1: array patterns take any iterable

```
D1 string: B I [ 'S', 'T' ]
D1 Set: ASELS
D1 Map: USDTRY 34.2
D1 generator: 40 41
```

A string gives its characters, a Set gives its unique values in insertion order (so the
duplicate `ASELS` is only counted once), a Map gives `[key, value]` pairs (so I need a nested
pattern `[[k, v]]`), and a generator gives what it yields.

### D2: what an array pattern really calls

```
D2 Symbol.iterator called
D2 next() call 1
D2 next() call 2
D2 return() called (iterator closed early)
D2 result: 10 20
D2 array-like: TypeError - {(intermediate value)(intermediate value)} is not iterable
```

The pattern calls `value[Symbol.iterator]()` once, then `next()` only as many times as it has
positions (two here, not five). Because it stops early it calls `return()` to close the
iterator. An object with `0` and `length` looks like an array but has no `Symbol.iterator`, so
it throws "is not iterable". Array patterns are about the iteration protocol, not about arrays.

### D3: order of evaluation

```
D3 default computed for ask
D3 result: 39.9 0
D3 uses earlier variable: 1 2
D3 later variable: ReferenceError - Cannot access 'y' before initialization
```

Defaults are lazy: `fallback('bid')` never runs because `bid` exists; only the missing `ask`
calls it. Defaults are evaluated left to right, so `high = low * 2` can use `low`, but
`[x = y, y = 1]` throws a ReferenceError because `y` is still in its temporal dead zone.

### D4: destructuring in other places

```
D4 catch: SyntaxError - Expected property name or '}' in JSON at position 2 (line 1 column 3)
D4 for...in gives keys: ASELS
D4 for...in gives keys: THYAO
D4 for...of entries: ASELS 120
D4 for...of entries: THYAO 40
D4 assignment targets: { min: 39.8, max: 43.5 }
D4 into array slots: [ 'x', 'y' ]
```

`catch ({ name, message })` takes the error object apart directly. `for...in` gives only keys
(strings), `for...of` over `Object.entries` gives pairs I can destructure. In assignment (not
declaration) the targets can be any property, like `target.min` or `list[0]`.

### D5: when destructuring makes code worse

```
D5 deep: BIST 22 11
D5 two steps: BIST 22 11
```

The one-line deep pattern `{ meta: { source: { name: srcName, updated: { day, month } } } }`
works, but it is hard to read, the names `meta`, `source`, `updated` are only a path and are not
variables, and if any level is missing it throws. The two-step version is longer but each
line is clear and easier to debug. I would keep patterns to one level plus maybe one rename.

### D6 to D8: the same idea at the type level

```
D6 First/Rest: ASELS [ 58.4, 1200 ]
D6 OwnerOf: { name: 'Kamil', account: 'Midas' }
D7 Parameters: THYAO 3 -> buy 3 x THYAO
D8 generic component: <ul><li>ASELS: 120</li><li>THYAO: 40</li></ul>
```

- **D6** `First<T>` and `Rest<T>` use `infer` inside a tuple pattern `[infer F, ...infer R]`,
  which is form 2 for types. `OwnerOf<T>` does the same for an object type.
- **D7** `Parameters<typeof placeOrder>` gives `[ticker: string, qty: number, side?: 'buy' | 'sell']`,
  so the parameters themselves are a tuple I can destructure and spread back in.
- **D8** In the generic `List<T>`, TypeScript infers `T` from `items`, so inside
  `render={({ ticker, qty }) => ...}` the pattern is fully typed without any annotation.

## Bonus 3: Real code

Five real cases (plus one more), with the file and line.

### Case 1: A3 starter, `src/App.tsx` line 37

**Form:** 1

```js
const [tasks, dispatch] = useReducer(taskReducer, [])
```

Without destructuring:

```js
const r = useReducer(...); const tasks = r[0]; const dispatch = r[1]
```

### Case 2: A3 starter, `src/TaskRow.tsx` line 5

**Form:** 11 (with 5)

```js
function TaskRow({ task, onNext, onDelete }: TaskRowProps)
```

Without destructuring:

```js
function TaskRow(props: TaskRowProps) { const task = props.task; ... }
```

### Case 3: vite 8.3.8, `node_modules/vite/dist/node/chunks/node.js` line 6198

**Form:** 11 + 7

```js
function resolveEnvPrefix({ envPrefix = "VITE_" })
```

Without destructuring:

```js
function resolveEnvPrefix(config) { let envPrefix = config.envPrefix === undefined ? "VITE_" : config.envPrefix }
```

### Case 4: vite 8.3.8, same file, line 1991

**Form:** 12 (in a normal `for`)

```js
const entries = Object.entries(obj); // line 1988
const [key, value] = entries[i];    // line 1991, inside for (let i = 0; ...)
```

Without destructuring:

```js
const key = entries[i][0]; const value = entries[i][1]
```

### Case 5: vite 8.3.8, same file, line 22958

**Form:** 9

```js
const { EventTarget: { addEventListener, removeEventListener } } = require_event_target();
```

Without destructuring:

```js
const et = require_event_target().EventTarget; const addEventListener = et.addEventListener; ...
```

### Case 6: shadcn/ui, `apps/v4/registry/new-york-v4/ui/button.tsx` lines 40-49 (commit `bfa64ff`)

**Form:** 11 + 7 + 8

```js
function Button({ className, variant = "default", size = "default", asChild = false, ...props }: React.ComponentProps<"button"> & ...)
```

Without destructuring:

```js
function Button(allProps) { const variant = allProps.variant ?? "default"; ... const props = { ...allProps }; delete props.className; ... }
```

**Where it makes the code worse (case 5).** The nested pattern hides the fact that
`EventTarget` is an object; a reader has to unpack two levels in their head, and if
`EventTarget` were missing the error would be a confusing "Cannot destructure property". Two
lines (`const { EventTarget } = ...; const { addEventListener } = EventTarget`) say the same
thing more clearly. Case 3 also has a small trap: `envPrefix` is reassigned right after
(`envPrefix = arraify(envPrefix)`), so the same name means two different types in one function.

**React props (case 6).** `className`, `variant`, `size` and `asChild` are props the component
uses itself; `...props` collects every other prop of a real `<button>` (`onClick`, `disabled`,
`type`, ...) and also `children`, because children is just one more prop. The button text
between the tags is never named here: it goes through `{...props}` onto `<Comp>`, the same as
P4 in my guide. Because `{...props}` comes after `data-slot` and `data-variant`, a caller could
override those, but `className` is taken out first and merged with `cn(...)`, so the caller's
class is added, not replacing the base classes.

## Bonus 4: Git repository

https://github.com/kpostaagasi/mis233-assignment4 (public). The repository has a `.gitignore`
that leaves out `node_modules` and the LaTeX build files.

## My own log

TODO (Kamil): at least five real things that went wrong or surprised me while I ran this
project, with the exact error message and what I learned. To be written by me after running
the experiments myself.
