/**
 * generate string of the russian currancy
 * @param  {number} number
 * @return {string}
 */
export const transformToCurrency = (number: number): string => `${number.toLocaleString('ru-RU')} Р`

/**
 * compare two number
 * @param  {number} a
 * @param  {number} b
 * @returns {number}
 */
export const compareNumbers = (a: number, b: number): number => a - b
