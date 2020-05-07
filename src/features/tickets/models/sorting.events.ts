import { createEvent } from 'effector'
import { SortingIds } from '../types'

export const switchSorting = createEvent<SortingIds>()
