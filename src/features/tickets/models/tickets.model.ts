import { createStore, combine } from 'effector'

import { TicketModel } from '../types'
import { updateTickets } from './tickets.events'
import { $activeSortingId } from './sorting.model'
import { $activatedStops } from './filters.models'
import { transformTicketEntity } from '../lib/transformer'
import { compareNumbers } from '../../../lib/number'

const $ticketsModel = createStore<TicketModel[]>([])

// added new tickets to the tickets store
$ticketsModel.on(updateTickets, (store, tickets) => {
  const newModelTickets = tickets.map(transformTicketEntity)

  return [...store, ...newModelTickets]
})

// sorting and filtration of the tickets by the arrays that we generated before
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
