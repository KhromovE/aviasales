import React, { useCallback } from 'react'

import { FilteringLable } from '../atoms'
import { FilteringTemplate } from '../templates'
import { Checkbox } from '../../../ui/molecules'
import { Filters } from '../types'

type Props = {
  items: Filters[]
  onClick: (id: string) => void
}

export const Filtering: React.FC<Props> = ({ items, onClick }) => {
  const handleClick = useCallback((e) => {
    onClick(e.target.id)
  }, [])

  return (
    <FilteringTemplate>
      <FilteringLable>Количество пересадок</FilteringLable>
      {items.map((item) => (
        <Checkbox id={item.id} checked={item.active} key={item.id} onChange={handleClick}>
          {item.title}
        </Checkbox>
      ))}
    </FilteringTemplate>
  )
}
