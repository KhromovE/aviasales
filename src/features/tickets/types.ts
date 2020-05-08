export type SearchId = string

export type SearchIdResponse = {
  searchId: SearchId
}

export type SegmentEntity = {
  origin: string
  destination: string
  date: string
  stops: string[]
  duration: number
}

export type SegmentEntities = SegmentEntity[]

export type TicketEntity = {
  price: number
  carrier: string
  segments: SegmentEntities
}

export type TicketModel = TicketEntity & {
  id: string
  duration: number
  stopsCount: number
}

export type TicketsResponse = {
  tickets: TicketEntity[]
  stop: boolean
}

export type Segment = {
  date: string
  duration: string
  jorney: string
  stopsTitle: string
  stopsValue: string
}

export type Segments = Segment[]

export type Ticket = {
  id: string
  price: string
  logo: string
  carrier: string
  segments: Segments
}

export type SortingIds = 'price' | 'duration'

export type SortingItem = {
  id: SortingIds
  active: boolean
  title: string
}

export type Filters = {
  id: string
  active: boolean
  title: string
}
