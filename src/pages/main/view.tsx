import React, { memo } from 'react'
import { useStore } from 'effector-react'

import { MainTemplate } from '../../ui/templates'
import { Header } from '../../ui/molecules'
import { Filtering, Sorting, TicketList, $filters } from '../../features/tickets'
import Logo from '../../assets/images/logo.svg'
import { MainGate, sortingClicked, filterCliced, $visableTickets, $sorting } from './model'

export const Main: React.FC = memo(() => {
  const tickets = useStore($visableTickets)
  const sorting = useStore($sorting)
  const filters = useStore($filters)

  return (
    <>
      <MainGate />
      <MainTemplate
        header={
          <Header>
            <Logo />
          </Header>
        }
        filters={<Filtering items={filters} onClick={filterCliced} />}
        sorting={<Sorting items={sorting} onClick={sortingClicked} />}
      >
        <TicketList tickets={tickets} />
      </MainTemplate>
    </>
  )
})
