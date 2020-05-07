import { createStore } from 'effector'

import { SortingItem, SortingIds } from '../types'
import { switchSorting } from './sorting.events'

export const $sorting = createStore<SortingItem[]>([
  {
    id: 'price',
    active: true,
    title: 'самый дешевый',
  },
  {
    id: 'duration',
    active: false,
    title: 'самый быстрый',
  },
])

$sorting.on(switchSorting, (store, id) =>
  store.map((item) => ({
    ...item,
    active: item.id === id,
  })),
)

export const $activeSortingId = $sorting.map<SortingIds>((sorting) =>
  sorting.reduce((id, nextItem) => {
    if (nextItem.active === true) return nextItem.id

    return id
  }, sorting[0].id),
)
