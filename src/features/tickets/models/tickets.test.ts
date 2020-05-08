import nanoid from 'nanoid'
import { createEvent } from 'effector'

import { updateTickets } from './tickets.events'
import { $filteredTickets, $ticketsModel } from './tickets.model'
import { updateFilters, switchFilter } from './filters.events'
import { $filters } from './filters.models'
import { toggleSorting } from './sorting.events'
import { $sorting } from './sorting.model'
import { TicketModel } from '../types'

jest.mock('nanoid')

describe('tickets', () => {
  const id = 'testid'
  const nextId = 'nextTestId'
  const resetTicketsModel = createEvent()
  const resetFilters = createEvent()
  const resetSorting = createEvent()
  $ticketsModel.reset(resetTicketsModel)
  $filters.reset(resetFilters)
  $sorting.reset(resetSorting)

  const nanoidSpy = jest.spyOn(nanoid, 'nanoid')

  const tickets = [
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

  const severalTickets = [
    {
      price: 20000,
      carrier: 'TT',
      segments: [
        {
          origin: 'BB',
          destination: 'KK',
          date: '',
          stops: ['ZZ', 'KK'],
          duration: 10000,
        },
      ],
    },
    {
      price: 10000,
      carrier: 'KK',
      segments: [
        {
          origin: 'BB',
          destination: 'KK',
          date: '',
          stops: ['ZZ', 'KK'],
          duration: 20000,
        },
      ],
    },
  ]

  beforeEach(() => {
    nanoidSpy.mockReturnValueOnce(id).mockReturnValueOnce(nextId)
  })

  afterEach(() => {
    resetTicketsModel()
    resetFilters()
    resetSorting()
  })

  afterAll(() => {
    $ticketsModel.off(resetTicketsModel)
    $filters.off(resetFilters)
    $sorting.off(resetSorting)
  })

  test('should update tickets store with additional fields', () => {
    const defaultState: TicketModel[] = []
    const expectedState = [
      {
        id,
        price: 12345,
        duration: 12345,
        stopsCount: [2],
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

    expect($filteredTickets.getState()).toEqual(defaultState)

    updateFilters(tickets)
    updateTickets(tickets)

    expect($filteredTickets.getState()).toEqual(expectedState)
  })

  test('shouldn’t update tickets store when a filter is disabled', () => {
    const defaultState: TicketModel[] = []
    const expectedState: TicketModel[] = []

    expect($filteredTickets.getState()).toEqual(defaultState)

    updateFilters(tickets)
    updateTickets(tickets)
    switchFilter('-1')

    expect($filteredTickets.getState()).toEqual(expectedState)
  })

  test('should change position of the tickets on toggle sorting', () => {
    const defaultState: TicketModel[] = [
      {
        id: nextId,
        price: 10000,
        duration: 20000,
        stopsCount: [2],
        carrier: 'KK',
        segments: [
          {
            origin: 'BB',
            destination: 'KK',
            date: '',
            stops: ['ZZ', 'KK'],
            duration: 20000,
          },
        ],
      },
      {
        id,
        price: 20000,
        duration: 10000,
        stopsCount: [2],
        carrier: 'TT',
        segments: [
          {
            origin: 'BB',
            destination: 'KK',
            date: '',
            stops: ['ZZ', 'KK'],
            duration: 10000,
          },
        ],
      },
    ]
    const expectedState: TicketModel[] = defaultState.concat().reverse()

    updateFilters(severalTickets)
    updateTickets(severalTickets)

    expect($filteredTickets.getState()).toEqual(defaultState)

    toggleSorting('duration')

    expect($filteredTickets.getState()).toEqual(expectedState)
  })
})
