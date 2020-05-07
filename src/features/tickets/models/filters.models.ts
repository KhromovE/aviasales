import { createStore } from 'effector'

import { Filters } from '../types'
import { updateFilters, switchFilter } from './filters.events'
import { findLargestStops, createStopTitle } from '../lib/transformer'

const ALL_STOPS_ID = '-1'

export const $filters = createStore<Filters[]>([
  {
    id: ALL_STOPS_ID,
    title: 'Все',
    active: true,
  },
])

$filters
  .on(updateFilters, (state, tickets) =>
    tickets.reduce((acc, ticket) => {
      const stopsCount = findLargestStops(ticket.segments)
      const stopsCountString = stopsCount.toString()
      const filterExists = acc.find((filter) => filter?.id === stopsCountString)

      if (filterExists) return acc

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

    if (index !== 0) {
      newState[0].active = false
      newState[index].active = !isActive
    } else {
      newState = newState.map((item) => ({
        ...item,
        active: !isActive,
      }))
    }

    return newState
  })

export const $activatedStops = $filters.map((filters) =>
  filters.slice(1).reduce((stops: number[], filter) => {
    const id = Number(filter.id)

    if (!filter.active) return stops

    return [...stops, id]
  }, []),
)