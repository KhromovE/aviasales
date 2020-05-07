import { createStore } from 'effector'

import { $tickets } from '../../features/tickets'

// type Filter = {
//   id: string
//   title: string
//   checked: boolean
// }

// export const $stopsAll = createStore<Filter>({
//   id: 'stops_all',
//   title: 'Все',
//   checked: true,
// })

export const $visableTickets = $tickets.map((tickets) => tickets.slice(0, 5))
