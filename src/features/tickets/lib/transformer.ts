import { nanoid } from 'nanoid'

import { SegmentEntities, TicketEntity, Segments, Ticket } from '../types'

import { numberToCurrency } from '../../../lib/number'
import { createNumTransformer } from '../../../lib/string'
import { minutesConvert } from '../../../lib/date'
import { STOP_TITLES, WIHTOUT_STOPS } from '../constants/stops'

export const generateStopTitle = createNumTransformer(STOP_TITLES)

const generateStopTitles = (stops: number): string => {
  if (stops === 0) {
    return WIHTOUT_STOPS
  }

  return `${stops} ${generateStopTitle(stops)}`
}
const generateStopValue = (stops: string[]): string =>
  stops.reduce((value, nextStop) => {
    if (value.length === 0) return nextStop

    return `${value}, ${nextStop}`
  }, '')
const generateLogoLink = (carrier: string): string => `${process.env.CDN_URL}/${carrier}.png`
const prepareSegments = (segments: SegmentEntities): Segments =>
  segments.map((segment) => {
    const duration = minutesConvert(segment.duration)
    const stopsTitle = generateStopTitles(segment.stops.length)
    const stopsValue = generateStopValue(segment.stops)

    return {
      duration: `${duration.hours}ч ${duration.minutes}м`,
      jorney: `${segment.origin} - ${segment.destination}`,
      stopsTitle,
      stopsValue,
    }
  }) as Segments

export const transformTicket = (tickets: TicketEntity[]): Ticket[] =>
  tickets.map((ticket) => ({
    id: nanoid(),
    carrier: ticket.carrier,
    price: numberToCurrency(ticket.price),
    logo: generateLogoLink(ticket.carrier),
    segments: prepareSegments(ticket.segments),
  }))
