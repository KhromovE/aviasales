type NumTransformerCreator = (titles: string[]) => (number: number) => string

/**
 * partial function that takes array of strings and return new function
 * nested function decline the noun by the array and number
 * @param  {string[]} titles
 * @returns {(number: number) => string}
 */
export const createNounDeclension: NumTransformerCreator = (titles) => (number) => {
  const cases = [2, 0, 1, 1, 1, 2]
  const caseId = number % 10 < 5 ? number % 10 : 5
  const titleIndex = number % 100 > 4 && number % 100 < 20 ? 2 : cases[caseId]

  return titles[titleIndex]
}
