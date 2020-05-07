import { createEvent } from 'effector'

import { TicketEntity } from '../types'

export const updateFilters = createEvent<TicketEntity[]>()
export const switchFilter = createEvent<string>()
