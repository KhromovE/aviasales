import { createEvent, createStore, combine, forward, sample } from 'effector'
import { createGate } from 'effector-react'

import {
  loadSearchId,
  transformTicket,
  switchSorting,
  switchFilter,
  $filteredTickets,
  SortingIds,
  Ticket,
} from '../../features/tickets'

export { $sorting, $filters } from '../../features/tickets'

export const MainGate = createGate()

export const sortingClicked = createEvent<SortingIds>()
export const filterCliced = createEvent<string>()
const updateCache = createEvent<Record<string, Ticket>>()

export const $cachedTickets = createStore<Record<string, Ticket>>({})
export const $visableTickets = createStore<Ticket[]>([])

$cachedTickets.on(updateCache, (state, tickets) => ({ ...tickets, ...state }))

sample({
  source: $visableTickets,
  clock: $visableTickets.updates,
  fn: (tickets) => tickets.reduce((acc, ticket) => ({ ...acc, [ticket.id]: ticket }), {}),
  target: updateCache,
})

sample({
  source: combine({ tickets: $filteredTickets, cache: $cachedTickets }),
  clock: $filteredTickets.updates,
  fn: ({ tickets, cache }) =>
    tickets.slice(0, 5).map((ticket) => {
      return cache[ticket.id] ? cache[ticket.id] : transformTicket(ticket)
    }),
  target: $visableTickets,
})

forward({
  from: MainGate.open,
  to: loadSearchId,
})

forward({
  from: sortingClicked,
  to: switchSorting,
})

forward({
  from: filterCliced,
  to: switchFilter,
})
