import { $tickets } from '../../features/tickets'

export const $visableTickets = $tickets.map((tickets) => tickets.slice(0, 5))
