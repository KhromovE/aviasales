import { createStore, combine } from 'effector'

import { TicketModel } from '../types'
import { updateTickets } from './tickets.events'
import { $activeSortingId } from './sorting.model'
import { $activatedStops } from './filtering.models'
import { transformTicketEntity } from '../lib/transformer'
import { compareNumbers } from '../../../lib/number'

export const $ticketsModel = createStore<TicketModel[]>([])

$ticketsModel.on(updateTickets, (store, tickets) => {
  const newModelTickets = tickets.map(transformTicketEntity)

  return [...store, ...newModelTickets]
})

export const $filteredTickets = combine(
  $ticketsModel,
  $activatedStops,
  $activeSortingId,
  (tickets, activatedStops, sortingId) => {
    return tickets
      .concat()
      .filter((ticket) => activatedStops.includes(ticket.stopsCount))
      .sort((curTicket, nextTicket) => compareNumbers(curTicket[sortingId], nextTicket[sortingId]))
  },
)
