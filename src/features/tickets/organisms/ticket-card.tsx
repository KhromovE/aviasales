import React, { memo } from 'react'

import { TicketTemplates } from '../templates'
import { TicketHeader, TicketSegment } from '../molecules'
import { Ticket } from '../types'

type Props = {
  ticket: Ticket
}

export const TicketCard: React.FC<Props> = memo(({ ticket }) => (
  <TicketTemplates>
    <TicketHeader price={ticket.price} logo={ticket.logo} carrier={ticket.carrier} />
    {ticket.segments.map((segment) => (
      <TicketSegment segment={segment} key={segment.date} />
    ))}
  </TicketTemplates>
))
