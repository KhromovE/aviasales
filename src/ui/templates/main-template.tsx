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
  gap: var(--spacing-md) var(--spacing-md);
  margin-bottom: 120px;
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

const ContentWrapper = styled.main`
  grid-area: 3 / 2;
`

export const MainTemplate: React.FC<Props> = ({ header, filters, sorting, children }) => (
  <Container>
    <HeaderWrapper>{header}</HeaderWrapper>
    <FiltersWrapper>{filters}</FiltersWrapper>
    <SortingWrapper>{sorting}</SortingWrapper>
    <ContentWrapper>{children}</ContentWrapper>
  </Container>
)
