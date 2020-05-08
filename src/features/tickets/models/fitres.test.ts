import { createEvent } from 'effector'
import { $filters, $activatedStops } from './filters.models'
import { updateFilters, switchFilter } from './filters.events'

describe('filters', () => {
  const resetFilters = createEvent()
  const resetActivatedStops = createEvent()
  $filters.reset(resetFilters)
  $activatedStops.reset(resetActivatedStops)

  const tickets = [
    {
      price: 12345,
      carrier: 'TT',
      segments: [
        {
          origin: 'BB',
          destination: 'KK',
          date: '',
          stops: ['LL', 'KK'],
          duration: 12345,
        },
      ],
    },
  ]

  afterEach(() => {
    resetFilters()
    resetActivatedStops()
  })

  afterAll(() => {
    $filters.off(resetFilters)
    $activatedStops.off(resetActivatedStops)
  })

  test('should update filters on updateFilters', () => {
    const defaultState = [
      {
        id: '-1',
        title: 'Все',
        active: true,
      },
    ]
    const expectedState = [...defaultState]
    expectedState[3] = {
      id: '2',
      active: true,
      title: '2 пересадки',
    }
    expect($filters.getState()).toEqual(defaultState)

    updateFilters(tickets)

    expect($filters.getState()).toEqual(expectedState)
  })

  test('should add only one filter when stops length are equal in several tickets', () => {
    const doubledStopsTickets = [
      {
        price: 12345,
        carrier: 'TT',
        segments: [
          {
            origin: 'BB',
            destination: 'KK',
            date: '',
            stops: ['ZZ', 'KK'],
            duration: 12345,
          },
        ],
      },
      {
        price: 12345,
        carrier: 'TT',
        segments: [
          {
            origin: 'BB',
            destination: 'KK',
            date: '',
            stops: ['ZZ', 'KK'],
            duration: 12345,
          },
        ],
      },
    ]
    const defaultState = [
      {
        id: '-1',
        title: 'Все',
        active: true,
      },
    ]
    const expectedState = [...defaultState]
    expectedState[3] = {
      id: '2',
      active: true,
      title: '2 пересадки',
    }
    expect($filters.getState()).toEqual(defaultState)

    updateFilters(doubledStopsTickets)

    expect($filters.getState()).toEqual(expectedState)
  })

  test('should change active flag of a filter on the switchFilter call', () => {
    const defaultState = [
      {
        id: '-1',
        title: 'Все',
        active: true,
      },
    ]
    const stateWithSeveralFilters = [...defaultState]
    stateWithSeveralFilters[3] = {
      id: '2',
      active: true,
      title: '2 пересадки',
    }

    const expectedFilter = {
      ...stateWithSeveralFilters[3],
      active: false,
    }

    updateFilters(tickets)
    switchFilter('2')

    expect($filters.getState()[3]).toEqual(expectedFilter)
  })

  test('should generate new stops array when filtest are changed', () => {
    const defaultState: number[] = []
    const expectedState = [2]

    expect($activatedStops.getState()).toEqual(defaultState)

    updateFilters(tickets)

    expect($activatedStops.getState()).toEqual(expectedState)
  })

  test('should add to stops store a stop when a filter is disabled', () => {
    const defaultState: number[] = []
    const expectedState: number[] = []

    expect($activatedStops.getState()).toEqual(defaultState)
    updateFilters(tickets)
    switchFilter('2')

    expect($activatedStops.getState()).toEqual(expectedState)
  })
})
