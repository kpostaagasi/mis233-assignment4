// Kamil Postaağası, 2023501030
// The same four array forms as js/arrays.mjs, now typed. Run with `npx tsx ts/arrays.ts`.

// Form 1: the return type is a tuple [number, number], so each variable is a number.
function minMax(numbers: number[]): [number, number] {
  return [Math.min(...numbers), Math.max(...numbers)]
}
const closes: number[] = [41.2, 39.8, 43.5, 40.1]
const [lowest, highest] = minMax(closes)
console.log('form 1:', lowest, highest)

// Form 2: with noUncheckedIndexedAccess, secondCourse is string | undefined
// (the array could be shorter), the rest is always a string[].
const courses: string[] = ['MIS 233', 'INTT 321', 'MIS 251', 'INTT 375']
const [, secondCourse, ...otherCourses] = courses
console.log('form 2:', secondCourse ?? '(none)', otherCourses)

// Form 3: swap; both variables must have compatible types.
let buy: string = 'AKBNK'
let sell: string = 'GARAN'
;[buy, sell] = [sell, buy]
console.log('form 3:', buy, sell)

// Form 4: defaults. The type after the pattern says items may be missing.
const empty: [string?, number?] = []
const [currency = 'TRY', amount = 0] = empty // currency: string, amount: number (no undefined)
console.log('form 4:', currency, amount)
