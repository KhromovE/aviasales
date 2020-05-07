import { createEvent } from 'effector'

import { TicketEntity } from '../types'

export const updateFiltering = createEvent<TicketEntity[]>()
export const switchFilter = createEvent<string>()
