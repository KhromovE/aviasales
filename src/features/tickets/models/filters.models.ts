import { createStore } from 'effector'

import { Filters } from '../types'
import { updateFilters, switchFilter } from './filters.events'
import { findLargestStops, createStopTitle } from '../lib/transformer'
import { ALL_STOPS_ID, ALL_STOPS_TITLE } from '../constants/stops'

export const $filters = createStore<Filters[]>([
  {
    id: ALL_STOPS_ID,
    title: ALL_STOPS_TITLE,
    active: true,
  },
])

$filters
  // update filters with new a tickets chunks
  .on(updateFilters, (state, tickets) =>
    tickets.reduce((acc, ticket) => {
      const stopsCount = findLargestStops(ticket.segments)
      const stopsCountString = stopsCount.toString()
      const filterExists = acc.find((filter) => filter?.id === stopsCountString)

      // if filter is already exists don't do anything
      if (filterExists) return acc

      // otherwise add a new filter
      acc[stopsCount + 1] = {
        id: stopsCountString,
        title: createStopTitle(stopsCount),
        active: true,
      }

      return acc.concat()
    }, state),
  )
  .on(switchFilter, (state, id) => {
    const index = Number(id) + 1
    let newState = state.concat()
    const isActive = newState[index].active

    // if the allStops filter was switched then change all switch filters
    if (index !== 0) {
      newState[0].active = false
      newState[index].active = !isActive
    } else {
      // otherwise change only one filter
      newState = newState.map((item) => ({
        ...item,
        active: !isActive,
      }))
    }

    return newState
  })

// generate the array for convenient filtration of the tickets list
export const $activatedStops = $filters.map((filters) =>
  filters.slice(1).reduce((stops: number[], filter) => {
    const id = Number(filter.id)

    if (!filter.active) return stops

    return [...stops, id]
  }, []),
)
