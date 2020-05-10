import React from 'react'
import styled from 'styled-components'

import { Segment } from '../types'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: var(--font-weight-bold);
`

const Title = styled.span`
  font-size: var(--font-size-xs);
  color: var(--gray);
  line-height: 18px;
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing);
`

const Value = styled.span`
  font-size: var(--font-size-md);
  color: var(--gray-dark);
  line-height: 21px;
`

type Props = {
  segment: Segment
}

export const TicketSegment: React.FC<Props> = ({ segment }) => (
  <>
    <Wrapper>
      <Title>{segment.jorney}</Title>
      <Value>{segment.date}</Value>
    </Wrapper>
    <Wrapper>
      <Title>в пути</Title>
      <Value>{segment.duration}</Value>
    </Wrapper>
    <Wrapper>
      <Title>{segment.stopsTitle}</Title>
      <Value>{segment.stopsValue}</Value>
    </Wrapper>
  </>
)
