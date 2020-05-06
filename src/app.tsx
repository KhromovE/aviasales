import React from 'react'
import { hot } from 'react-hot-loader'
import { Normalize } from 'styled-normalize'

import { GlobalStyles } from './global-styles'

declare const module: any

const AppComponent: React.FC = () => (
  <>
    <GlobalStyles />
    <Normalize />
  </>
)

export const App = hot(module)(AppComponent)
