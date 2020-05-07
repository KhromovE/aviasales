import { createEvent } from 'effector'
import { TicketEntity } from '../types'

export const updateTickets = createEvent<TicketEntity[]>()
