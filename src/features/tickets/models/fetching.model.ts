import { createEffect, merge, sample, restore, forward } from 'effector'

import { getSearchId, getTickets } from '../api'
import { updateTickets } from './tickets.events'
import { updateFilters } from './filters.events'
import { loadSearchId } from './fetching.events'

const fxLoadSearchId = createEffect({
  handler: getSearchId,
})

const fxLoadTickets = createEffect({
  handler: getTickets,
})

export const $searchId = restore(
  fxLoadSearchId.done.map(({ result }) => result.searchId),
  '',
)

// if the response does't have the stop flag enabled then we will load the next chunk
const loadMore = fxLoadTickets.done.filter({
  fn: ({ result: { stop } }) => stop !== true,
})

// load the first tickets chunk when the search id is received
sample({
  source: $searchId,
  clock: $searchId.updates,
  target: fxLoadTickets,
})

// if the response does't have the stop flag enabled then we will load the next chunk
sample({
  source: fxLoadTickets,
  clock: merge([fxLoadTickets.fail, loadMore]),
  target: fxLoadTickets,
})

// update the tickets store when tickets chunk is reciced
sample({
  source: fxLoadTickets.done,
  fn: ({ result }) => result.tickets,
  target: updateTickets,
})

forward({
  from: loadSearchId,
  to: fxLoadSearchId,
})

forward({
  from: updateTickets,
  to: updateFilters,
})
