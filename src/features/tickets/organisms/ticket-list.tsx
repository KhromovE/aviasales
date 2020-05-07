import React from 'react'
import { Ticket } from '../types'

import { TicketListTemplate } from '../templates'
import { TicketCard } from './ticket-card'

type Props = {
  tickets: Ticket[]
}

export const TicketList: React.FC<Props> = ({ tickets }) => (
  <TicketListTemplate>
    {tickets.map((ticket) => (
      <TicketCard ticket={ticket} key={ticket.id} />
    ))}
  </TicketListTemplate>
)
