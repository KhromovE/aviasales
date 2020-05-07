import React from 'react'
import { Brick } from '../../../ui/atoms'
import { Checkbox } from '../../../ui/molecules'

export const Filters: React.FC = () => (
  <Brick>
    <Checkbox checked onChange={() => {}}>
      Все
    </Checkbox>
  </Brick>
)
