import React from 'react'
import styled from 'styled-components'

type Props = {
  header: React.ReactNode
  sideMenu: React.ReactNode
  panel: React.ReactNode
}

const Container = styled.div`
  --menu-size: 232px;
  --content-size: 502px;
  --bottom-spacing: calc(var(--spacing-md) * 6);
  --mobile-content-size: 660px;

  display: grid;
  justify-content: center;
  margin: 0 var(--spacing-md) var(--bottom-spacing);
  grid-template-columns: var(--menu-size) minmax(auto, var(--content-size));
  grid-template-rows: auto auto auto;
  gap: var(--spacing-md) var(--spacing-md);
  grid-template-areas:
    'header header'
    'side-menu panel'
    'side-menu content';

  @media (max-width: 700px) {
    grid-template-columns: minmax(auto, var(--mobile-content-size));
    grid-template-rows: max-content max-content auto 1fr;
    grid-template-areas:
      'header'
      'side-menu'
      'panel'
      'content';
  }
`

const HeaderWrapper = styled.div`
  grid-area: header;
`

const SideMenu = styled.div`
  grid-area: side-menu;
`

const Panel = styled.div`
  grid-area: panel;
`

const ContentWrapper = styled.main`
  grid-area: content;
`

export const MainTemplate: React.FC<Props> = ({ header, sideMenu, panel, children }) => (
  <Container>
    <HeaderWrapper>{header}</HeaderWrapper>
    <SideMenu>{sideMenu}</SideMenu>
    <Panel>{panel}</Panel>
    <ContentWrapper>{children}</ContentWrapper>
  </Container>
)
