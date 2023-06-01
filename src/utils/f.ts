// type Iterableify<T> = { [K in keyof T]: Iterable<T[K]> }
//
//
// type T1 = Iterableify<string[]> // Iterable<string>[]
// type T2 = Iterableify<{a: number, b: string}> // {a: Iterable<number>, b: Iterable<string>}
// type T3 = Iterableify<[number, string][]> // Iterable<[number, string]>[]
// W
//
// function* zip<T extends Array<any>>(
//
//   ...toZip: Iterableify<T>
// ): Generator<T> {
//   // Get iterators for all of the iterables.
//   const iterators = toZip.map(i => i[Symbol.iterator]())
//
//   while (true) {
//     // Advance all of the iterators.
//     const results = iterators.map(i => i.next())
//
//     // If any of the iterators are done, we should stop.
//     if (results.some(({ done }) => done)) {
//       break
//     }
//
//     // We can assert the yield type, since we know none
//     // of the iterators are done.
//     yield results.map(({ value }) => value) as T
//   }
// }