import React from 'react'
import { hot } from 'react-hot-loader'
import { Normalize } from 'styled-normalize'

import { GlobalStyles } from './global-styles'
import { TicketList } from './pages'

declare const module: any

const AppComponent: React.FC = () => (
  <>
    <GlobalStyles />
    <Normalize />
    <TicketList />
  </>
)

export const App = hot(module)(AppComponent)
