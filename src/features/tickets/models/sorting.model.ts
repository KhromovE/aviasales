import { createStore } from 'effector'

import { SortingItem, SortingIds } from '../types'
import { switchSorting } from './sorting.events'
import { PRICE_TITLE, DURATION_TITLE } from '../constants/sorting'

export const $sorting = createStore<SortingItem[]>([
  {
    id: 'price',
    active: true,
    title: PRICE_TITLE,
  },
  {
    id: 'duration',
    active: false,
    title: DURATION_TITLE,
  },
])

$sorting.on(switchSorting, (store, id) =>
  store.map((item) => ({
    ...item,
    active: item.id === id,
  })),
)

// generate the array for convenient sorting of the tickets list
export const $activeSortingId = $sorting.map<SortingIds>((sorting) =>
  sorting.reduce((id, nextItem) => {
    if (nextItem.active === true) return nextItem.id

    return id
  }, sorting[0].id),
)
