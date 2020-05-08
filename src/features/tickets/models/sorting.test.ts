import { createEvent } from 'effector'

import { toggleSorting } from './sorting.events'
import { $activeSortingId } from './sorting.model'

describe('sorting', () => {
  const resetStore = createEvent()
  $activeSortingId.reset(resetStore)

  afterEach(() => {
    resetStore()
  })

  afterAll(() => {
    $activeSortingId.off(resetStore)
  })

  test('should change activeSortingId on toggleSorting call when sorting id is changed', () => {
    expect($activeSortingId.getState()).toEqual('price')

    toggleSorting('duration')

    expect($activeSortingId.getState()).toEqual('duration')
  })

  test('shouldn’t change activeSortingId on toggleSorting call when sorting id ins’t changed', () => {
    expect($activeSortingId.getState()).toEqual('price')

    toggleSorting('price')

    expect($activeSortingId.getState()).toEqual('price')
  })
})
