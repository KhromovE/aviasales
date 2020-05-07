import React from 'react'
import { hot } from 'react-hot-loader'
import { Normalize } from 'styled-normalize'

import { GlobalStyles } from './global-styles'
import { Main } from './pages'

declare const module: any

const AppComponent: React.FC = () => (
  <>
    <GlobalStyles />
    <Normalize />
    <Main />
  </>
)

export const App = hot(module)(AppComponent)
