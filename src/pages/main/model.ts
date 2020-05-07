import { createEvent, forward } from 'effector'

import {
  transformTicket,
  switchSorting,
  $filteredTickets,
  SortingIds,
} from '../../features/tickets'

export { $sorting } from '../../features/tickets'

export const sortingClicked = createEvent<SortingIds>()

export const $visableTickets = $filteredTickets.map((tickets) =>
  tickets.slice(0, 5).map(transformTicket),
)

forward({
  from: sortingClicked,
  to: switchSorting,
})
