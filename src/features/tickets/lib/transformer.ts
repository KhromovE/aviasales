import { nanoid } from 'nanoid'

import { SegmentEntities, TicketEntity, Segments, Ticket, TicketModel } from '../types'

import { transformToCurrency } from '../../../lib/number'
import { extractTime, convertMinutes, addMinutes } from '../../../lib/date'
import { createNumTransformer } from '../../../lib/string'

import { STOP_TITLES, WIHTOUT_STOPS } from '../constants/stops'

const generateStopTitle = createNumTransformer(STOP_TITLES)

export const createStopTitle = (stops: number): string => {
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

const transformSegments = (segments: SegmentEntities): Segments =>
  segments.map((segment) => {
    const duration = convertMinutes(segment.duration)
    const stopsTitle = createStopTitle(segment.stops.length)
    const stopsValue = generateStopValue(segment.stops)
    const date = new Date(segment.date)
    const departureTime = extractTime(date)
    const arrivalDate = addMinutes(date, segment.duration)
    const arrivalTime = extractTime(arrivalDate)

    return {
      duration: `${duration.hours}ч ${duration.minutes}м`,
      jorney: `${segment.origin} - ${segment.destination}`,
      stopsTitle,
      stopsValue,
      date: `${departureTime} - ${arrivalTime}`,
    }
  }) as Segments

export const findLargestStops = (segments: SegmentEntities): number =>
  segments.reduce((count, nextSegment) => {
    const stops = nextSegment.stops.length

    if (count < stops) return stops

    return count
  }, 0)

export const transformTicketEntity = (ticket: TicketEntity): TicketModel => {
  const duration = ticket.segments.reduce((sum, nextSegment) => sum + nextSegment.duration, 0)
  const stopsCount = findLargestStops(ticket.segments)

  return {
    ...ticket,
    duration,
    stopsCount,
    id: nanoid(),
  }
}

export const transformTicket = (ticket: TicketModel): Ticket => ({
  id: ticket.id,
  carrier: ticket.carrier,
  price: transformToCurrency(ticket.price),
  logo: generateLogoLink(ticket.carrier),
  segments: transformSegments(ticket.segments),
})
