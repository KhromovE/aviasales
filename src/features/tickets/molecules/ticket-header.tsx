import React from 'react'
import styled from 'styled-components'

type Props = {
  price: string
  logo: string
  carrier: string
}

const Price = styled.span`
  grid-area: 1 / 2 span;
  display: flex;
  align-items: center;
  padding-bottom: var(--spacing-sm);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--primary);
  line-height: 24px;
`

const Logo = styled.img`
  padding-bottom: var(--spacing-sm);
`

export const TicketHeader: React.FC<Props> = ({ price, logo, carrier }) => (
  <>
    <Price>{price}</Price>
    <Logo src={logo} alt={carrier} />
  </>
)
