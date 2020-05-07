import React, { useCallback } from 'react'

import { Tab, Tabs } from '../../../ui/atoms'
import { SortingItem, SortingIds } from '../types'

type Props = {
  items: SortingItem[]
  onClick: (id: SortingIds) => void
}

export const Sorting: React.FC<Props> = ({ items, onClick }) => {
  const handleClick = useCallback((e) => onClick(e.target.id), [])

  return (
    <Tabs>
      {items.map((item) => (
        <Tab id={item.id} active={item.active} key={item.id} onClick={handleClick}>
          {item.title}
        </Tab>
      ))}
    </Tabs>
  )
}
