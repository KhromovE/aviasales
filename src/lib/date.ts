export type Time = {
  hours: number
  minutes: number
}

/**
 * convert minutes to the object of hours and minuts
 * @param  {number} minutes
 * @returns {Time}
 */
export const convertMinutes = (minutes: number): Time => {
  const remainingMinutes = minutes % 60
  const hours = (minutes - remainingMinutes) / 60

  return { hours, minutes: remainingMinutes }
}

/**
 * convert ISO to the HH:mm string
 * @param  {Date} date
 * @returns {string} HH:mm
 */
export const extractTime = (date: Date): string =>
  date.toLocaleTimeString().replace(/(.*)\D\d+/, '$1')

/**
 * generate new date from with minuts
 * @param  {Date} date
 * @param  {number} minutes
 * @returns {Date} generated date
 */
export const addMinutes = (date: Date, minutes: number): Date =>
  new Date(date.getTime() + minutes * 60000)
