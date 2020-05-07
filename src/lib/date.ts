export type Time = {
  hours: number
  minutes: number
}

type MinutesConverter = (minutes: number) => Time

export const convertMinutes: MinutesConverter = (minutes) => {
  const remainingMinutes = minutes % 60
  const hours = (minutes - remainingMinutes) / 60

  return { hours, minutes: remainingMinutes }
}

export const extractTime = (date: Date): string =>
  date.toLocaleTimeString().replace(/(.*)\D\d+/, '$1')

export const addMinutes = (date: Date, minutes: number): Date =>
  new Date(date.getTime() + minutes * 60000)

// export const
