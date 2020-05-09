import { createStore } from 'effector'

import { Filters } from '../types'
import { updateFilters, switchFilter } from './filters.events'
import { findStopCounts, createStopTitle } from '../lib/transformer'
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
    tickets.reduce(
      (acc, ticket) => {
        const stopCounts = findStopCounts(ticket.segments)
        const filterExists = stopCounts.every((stops) =>
          acc.find((filter) => filter?.id === stops.toString()),
        )

        // if filter is already exists don't do anything
        if (filterExists) return acc

        // otherwise add a new filter
        stopCounts.forEach((stop) => {
          if (acc[stop + 1]) return

          acc[stop + 1] = {
            id: stop.toString(),
            title: createStopTitle(stop),
            active: true,
          }
        })

        return acc
      },
      [...state],
    ),
  )
  .on(switchFilter, (state, id) => {
    const index = Number(id) + 1
    const isActive = state[index].active

    // if "all stops" filter switched then switch every filter
    if (index === 0) {
      return state.map((item) => ({
        ...item,
        active: !isActive,
      }))
    }

    // otherwise switch only one filter
    const newState = [...state]
    newState[index].active = !isActive

    // if all filters are checked then switch "all stops" filter
    const isAllFiltersChecked = newState.slice(1).every((filter) => filter?.active)
    newState[0].active = isAllFiltersChecked

    return newState
  })

// generate the array for convenient filtration of the tickets list
export const $activatedStops = $filters.map((filters) =>
  filters
    .slice(1)
    .reduce(
      (stops: number[], filter) =>
        filter === undefined || !filter.active ? stops : [...stops, Number(filter.id)],
      [],
    ),
)
