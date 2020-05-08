import { nanoid } from 'nanoid'

import { SegmentEntities, TicketEntity, Segments, Ticket, TicketModel } from '../types'

import { transformToCurrency } from '../../../lib/number'
import { extractTime, convertMinutes, addMinutes } from '../../../lib/date'
import { nounDeclension } from '../../../lib/string'

import { STOP_TITLES, WIHTOUT_STOPS } from '../constants/stops'

/**
 * cretes a function that will decline "пересадки"
 */
const stopsDecletion = nounDeclension(STOP_TITLES)

/**
 * create title for the view
 * @param  {number} stops count of the stops
 * @returns string that contains title for the view
 */
export const createStopTitle = (stops: number): string => {
  if (stops === 0) {
    return WIHTOUT_STOPS
  }

  return `${stops} ${stopsDecletion(stops)}`
}

/**
 * generate string that contains all stops
 * @param  {string[]} stops abbreviated name of the cities
 * @return {string}
 */
const generateStopValue = (stops: string[]): string =>
  stops.reduce((value, nextStop) => {
    if (value.length === 0) return nextStop

    return `${value}, ${nextStop}`
  }, '')

/**
 * generate link to the image
 * @param  {string} carrier abbreviated name of the carrier
 * @returns string link
 */
const generateLogoLink = (carrier: string): string => `${process.env.CDN_URL}/${carrier}.png`

/**
 * prepare segment for the view
 * @param  {SegmentEntities} segments raw segment
 * @returns prepared segments
 */
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
      jorney: `${segment.origin} – ${segment.destination}`,
      stopsTitle,
      stopsValue,
      date: `${departureTime} – ${arrivalTime}`,
    }
  })

/**
 * find the largest number of stops
 * @param  {SegmentEntities} segments tuple of the segment
 * @returns {number} count of the stops
 */
export const findLargestStops = (segments: SegmentEntities): number =>
  segments.reduce((count, nextSegment) => {
    const stops = nextSegment.stops.length

    if (count < stops) return stops

    return count
  }, 0)

/**
 * add several fields for convineint
 * @param  {TicketEntity} ticket
 * @returns {TicketModel} new ticket with additional fields
 */
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
/**
 * prepare ticket for the view
 * @param  {TicketModel} ticket from the backend
 * @returns {Ticket} ticket for the view
 */
export const transformTicket = (ticket: TicketModel): Ticket => ({
  id: ticket.id,
  carrier: ticket.carrier,
  price: transformToCurrency(ticket.price),
  logo: generateLogoLink(ticket.carrier),
  segments: transformSegments(ticket.segments),
})
