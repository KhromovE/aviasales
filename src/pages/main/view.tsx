import React, { memo } from 'react'
import { useStore } from 'effector-react'

import { MainTemplate } from '../../ui/templates'
import { Header } from '../../ui/atoms'
import { Preloader } from '../../ui/molecules'
import { Filtering, Sorting, TicketList } from '../../features/tickets'
import Logo from '../../assets/images/logo.svg'
import {
  MainGate,
  sortingClicked,
  filterCliced,
  $visableTickets,
  $sorting,
  $filters,
  $isLoading,
} from './model'

export const Main: React.FC = memo(() => {
  const tickets = useStore($visableTickets)
  const sorting = useStore($sorting)
  const filters = useStore($filters)
  const isLoading = useStore($isLoading)

  return (
    <>
      <MainGate />
      <MainTemplate
        preloader={<Preloader finished={!isLoading} />}
        header={
          <Header>
            <Logo />
          </Header>
        }
        sidePanel={<Filtering items={filters} onClick={filterCliced} />}
        panel={<Sorting items={sorting} onClick={sortingClicked} />}
      >
        <TicketList tickets={tickets} isLoading={isLoading} />
      </MainTemplate>
    </>
  )
})
