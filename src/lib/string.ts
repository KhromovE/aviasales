type NumTransformerCreator = (titles: string[], zero?: string) => (count: number) => string

/**
 * partial function that takes array of strings and return new function
 * nested function decline the noun by the array and count
 * @param  {string[]} titles
 * @param  {string} zero
 * @returns {(count: number) => string}
 */
export const createNounDeclension: NumTransformerCreator = (titles, zero) => (count) => {
  if (zero && count === 0) {
    return zero
  }

  const cases = [2, 0, 1, 1, 1, 2]
  const caseId = count % 10 < 5 ? count % 10 : 5
  const titleIndex = count % 100 > 4 && count % 100 < 20 ? 2 : cases[caseId]

  return `${count} ${titles[titleIndex]}`
}
