import React from 'react'
import { useStore } from 'effector-react'

import { MainTemplate } from '../../ui/templates'
import { Header } from '../../ui/molecules'
import { Filters, Sorting, TicketList, $filtering } from '../../features/tickets'
import Logo from '../../assets/images/logo.svg'
import { sortingClicked, filterCliced, $visableTickets, $sorting } from './model'

export const Main: React.FC = () => {
  const tickets = useStore($visableTickets)
  const sorting = useStore($sorting)
  const filtering = useStore($filtering)

  return (
    <MainTemplate
      header={
        <Header>
          <Logo />
        </Header>
      }
      filters={<Filters items={filtering} onClick={filterCliced} />}
      sorting={<Sorting items={sorting} onClick={sortingClicked} />}
    >
      <TicketList tickets={tickets} />
    </MainTemplate>
  )
}
