import { createStore, sample, merge, combine } from 'effector'

import { TicketModel } from '../types'
import { updateTickets } from './tickets.events'
import { $activeSortingId } from './sorting.model'
import { transformTicketEntity } from '../lib/transformer'
import { compareNumbers } from '../../../lib/number'

export const $ticketsModel = createStore<TicketModel[]>([])

$ticketsModel.on(updateTickets, (store, tickets) => {
  const newModelTickets = tickets.map(transformTicketEntity)

  return [...store, ...newModelTickets]
})

export const $filteredTickets = combine($ticketsModel, $activeSortingId, (tickets, sortingId) => {
  return tickets.concat().sort((curTicket, nextTicket) => {
    return compareNumbers(curTicket[sortingId], nextTicket[sortingId])
  })
})

// sample({
//   source: combine({ tickets: $ticketsModel, sorting: $sorting }),
//   clock: merge([$sorting.updates, $ticketsModel.updates]),
//   fn: ({ tickets, sorting }) =>
//     tickets.sort((ticket) => {
//       const activeSort
//       return ticket
//     }),
// })
