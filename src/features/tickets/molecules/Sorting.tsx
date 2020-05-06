import React from 'react'
import { Tab, Tabs } from '../../../ui/atoms'

export const Sorting: React.FC = () => (
  <Tabs>
    <Tab active>самый дешевый</Tab>
    <Tab active={false}>самый быстрый</Tab>
  </Tabs>
)
