import { get } from '../../lib/request'
import { SearchIdResponse, SearchId, TicketsResponse } from './types'

export const getSearchId = (): Promise<SearchIdResponse> =>
  get<SearchIdResponse>({ path: 'search' })
export const getTickets = (searchId: SearchId): Promise<TicketsResponse> =>
  get<TicketsResponse>({ path: 'tickets', params: { searchId } })
