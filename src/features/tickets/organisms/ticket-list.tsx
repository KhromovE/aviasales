import React, { memo } from 'react'
import { Ticket } from '../types'

import { TicketListTemplate } from '../templates'
import { TicketCard } from './ticket-card'
import { NothingFound } from '../atoms'

type Props = {
  tickets: Ticket[]
  isLoading: boolean
}

export const TicketList: React.FC<Props> = memo(({ tickets, isLoading }) => (
  <TicketListTemplate>
    {tickets.map((ticket) => (
      <TicketCard ticket={ticket} key={ticket.id} />
    ))}
    {tickets.length === 0 && !isLoading && <NothingFound />}
  </TicketListTemplate>
))
