import { createEvent, forward } from 'effector'

import {
  transformTicket,
  switchSorting,
  switchFilter,
  $filteredTickets,
  SortingIds,
} from '../../features/tickets'

export { $sorting, $filters } from '../../features/tickets'

export const sortingClicked = createEvent<SortingIds>()
export const filterCliced = createEvent<string>()

export const $visableTickets = $filteredTickets.map((tickets) =>
  tickets.slice(0, 5).map(transformTicket),
)

forward({
  from: sortingClicked,
  to: switchSorting,
})

forward({
  from: filterCliced,
  to: switchFilter,
})
