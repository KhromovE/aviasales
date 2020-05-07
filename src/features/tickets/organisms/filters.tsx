import React, { useCallback } from 'react'

import { Brick } from '../../../ui/atoms'
import { Checkbox } from '../../../ui/molecules'
import { FilteringItem } from '../types'

type Props = {
  items: FilteringItem[]
  onClick: (id: string) => void
}

export const Filters: React.FC<Props> = ({ items, onClick }) => {
  const handleClick = useCallback((e) => {
    onClick(e.target.id)
  }, [])

  return (
    <Brick>
      {items.map((item) => (
        <Checkbox id={item.id} checked={item.active} key={item.id} onChange={handleClick}>
          {item.title}
        </Checkbox>
      ))}
    </Brick>
  )
}
