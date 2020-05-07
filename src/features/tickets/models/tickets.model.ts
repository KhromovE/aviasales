import { createStore } from 'effector'

import { Ticket } from '../types'
import { updateTickets } from './tickets.events'
import { transformTicket } from '../lib/transformer'

export const $tickets = createStore<Ticket[]>([])

$tickets.on(updateTickets, (store, tickets) => {
  const ticketsWithId = transformTicket(tickets)

  return [...store, ...ticketsWithId]
})
