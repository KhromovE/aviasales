import React from 'react'
import styled from 'styled-components'

type Props = {
  header: React.ReactNode
  filters: React.ReactNode
  sorting: React.ReactNode
}

const Container = styled.div`
  max-width: var(--page-width);
  margin: auto;
  display: grid;
  grid-template-columns: 232px 502px;
  grid-template-rows: auto auto auto;
  gap: var(--gap) var(--gap);
`

const HeaderWrapper = styled.div`
  grid-area: 1 / 2 span;
`

const FiltersWrapper = styled.div`
  grid-area: 2 span / 1;
`

const SortingWrapper = styled.div`
  grid-area: 2 / 2;
`

const ContentWrapper = styled.div`
  grid-area: 3 / 2;
`

export const MainTemplate: React.FC<Props> = ({ header, filters, sorting }) => (
  <Container>
    <HeaderWrapper>{header}</HeaderWrapper>
    <FiltersWrapper>{filters}</FiltersWrapper>
    <SortingWrapper>{sorting}</SortingWrapper>
    <ContentWrapper>{filters}</ContentWrapper>
    <main />
  </Container>
)
