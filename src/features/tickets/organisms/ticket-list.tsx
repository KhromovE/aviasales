import React, { memo } from 'react'
import { Ticket } from '../types'

import { TicketListTemplate } from '../templates'
import { TicketCard } from './ticket-card'

type Props = {
  tickets: Ticket[]
}

export const TicketList: React.FC<Props> = memo(({ tickets }) => (
  <TicketListTemplate>
    {tickets.map((ticket) => (
      <TicketCard ticket={ticket} key={ticket.id} />
    ))}
  </TicketListTemplate>
))
