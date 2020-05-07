export type Time = {
  hours: number
  minutes: number
}

type MinutesConverter = (minutes: number) => Time

export const minutesConvert: MinutesConverter = (minutes) => {
  const remainingMinutes = minutes % 60
  const hours = (minutes - remainingMinutes) / 60

  return { hours, minutes: remainingMinutes }
}

// export const dateFromString
