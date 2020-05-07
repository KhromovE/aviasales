import { createEffect, merge, sample, restore } from 'effector'

import { getSearchId, getTickets } from '../api'
import { updateTickets } from './tickets.events'

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

const loadMore = fxLoadTickets.done.filter({
  fn: ({ result: { stop } }) => stop !== true,
})

sample({
  source: $searchId,
  clock: $searchId.updates,
  target: fxLoadTickets,
})

sample({
  source: fxLoadTickets,
  clock: merge([fxLoadTickets.fail, loadMore]),
  target: fxLoadTickets,
})

sample({
  source: fxLoadTickets.done,
  fn: ({ result }) => result.tickets,
  target: updateTickets,
})

fxLoadSearchId()
