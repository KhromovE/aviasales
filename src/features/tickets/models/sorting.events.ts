import { createEvent } from 'effector'
import { SortingIds } from '../types'

export const toggleSorting = createEvent<SortingIds>()
