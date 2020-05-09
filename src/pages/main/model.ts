import { createEvent, createStore, combine, forward, sample } from 'effector'
import { createGate } from 'effector-react'

import {
  loadSearchId,
  transformTicket,
  toggleSorting,
  switchFilter,
  $filteredTickets,
  SortingIds,
  Ticket,
} from '../../features/tickets'

export { $sorting, $filters, $isLoading } from '../../features/tickets'

export const MainGate = createGate()

export const sortingClicked = createEvent<SortingIds>()
export const filterCliced = createEvent<string>()
const updateCache = createEvent<Record<string, Ticket>>()

const $cachedTickets = createStore<Record<string, Ticket>>({})
export const $visableTickets = createStore<Ticket[]>([])

$cachedTickets.on(updateCache, (state, tickets) => ({ ...tickets, ...state }))

// update cache with new tickets
sample({
  source: $visableTickets,
  clock: $visableTickets.updates,
  fn: (tickets) => tickets.reduce((acc, ticket) => ({ ...acc, [ticket.id]: ticket }), {}),
  target: updateCache,
})

// transform tickets for view and if we already cache one of the ticket take it from the cache
sample({
  source: combine({ tickets: $filteredTickets, cache: $cachedTickets }),
  clock: $filteredTickets.updates,
  fn: ({ tickets, cache }) =>
    tickets
      .slice(0, 5)
      .map((ticket) => (cache[ticket.id] ? cache[ticket.id] : transformTicket(ticket))),
  target: $visableTickets,
})

forward({
  from: MainGate.open,
  to: loadSearchId,
})

forward({
  from: sortingClicked,
  to: toggleSorting,
})

forward({
  from: filterCliced,
  to: switchFilter,
})
