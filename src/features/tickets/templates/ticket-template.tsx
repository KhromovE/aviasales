import styled from 'styled-components'
import { Brick } from '../../../ui/atoms'

export const TicketTemplates = styled(Brick)`
  display: grid;
  padding: var(--spacing-md);
  gap: var(--spacing-sm) var(--spacing-md);
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: auto;
`
