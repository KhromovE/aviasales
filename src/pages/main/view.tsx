import React from 'react'
import { useStore } from 'effector-react'

import { MainTemplate } from '../../ui/templates'
import { Header } from '../../ui/molecules'
import { Filters, Sorting, TicketList } from '../../features/tickets'
import Logo from '../../assets/images/logo.svg'
import { $visableTickets } from './model'

export const Main: React.FC = () => {
  const tickets = useStore($visableTickets)

  return (
    <MainTemplate
      header={
        <Header>
          <Logo />
        </Header>
      }
      filters={<Filters />}
      sorting={<Sorting />}
    >
      <TicketList tickets={tickets} />
    </MainTemplate>
  )
}
