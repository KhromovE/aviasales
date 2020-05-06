import React from 'react'

import { MainTemplate } from '../../ui/templates'
import { Header } from '../../ui/molecules'
import { Filters, Sorting } from '../../features/tickets'
import Logo from '../../assets/images/logo.svg'

export const TicketList: React.FC = () => (
  <MainTemplate
    header={
      <Header>
        <Logo />
      </Header>
    }
    filters={<Filters />}
    sorting={<Sorting />}
  >
    here
  </MainTemplate>
)
