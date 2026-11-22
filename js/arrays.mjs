// Kamil Postaağası, 2023501030
// Array destructuring (forms 1 to 4). Plain JavaScript: run with `node js/arrays.mjs`.
// My data: a few BIST stock prices and my course list.

// Form 1: take values out of an array by position (a function returns two values).
function minMax(numbers) {
  return [Math.min(...numbers), Math.max(...numbers)]
}
const closes = [41.2, 39.8, 43.5, 40.1] // THYAO-like closing prices for 4 days
const [lowest, highest] = minMax(closes)
console.log('form 1:', lowest, highest)
// same as: const pair = minMax(closes); const lowest = pair[0]; const highest = pair[1]

// Form 2: skip the first item, take the second, collect the rest.
const courses = ['MIS 233', 'INTT 321', 'MIS 251', 'INTT 375']
const [, secondCourse, ...otherCourses] = courses
console.log('form 2:', secondCourse, otherCourses)
// the empty slot before the comma skips 'MIS 233'; ...otherCourses is a NEW array

// Form 3: swap two variables without a temporary variable.
let buy = 'AKBNK'
let sell = 'GARAN'
;[buy, sell] = [sell, buy] // leading ; so the line is not glued to the previous one
console.log('form 3:', buy, sell)

// Form 4: default values; a default is used only when the item is undefined.
const [currency = 'TRY', amount = 0] = []
console.log('form 4:', currency, amount)
const [cur2 = 'TRY', amt2 = 0] = ['USD', undefined]
console.log('form 4b:', cur2, amt2) // 'USD' is kept, undefined gets the default
