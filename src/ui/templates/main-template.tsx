import React from 'react'
import styled from 'styled-components'

type Props = {
  preloader: React.ReactNode
  header: React.ReactNode
  sidePanel: React.ReactNode
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
  grid-template-rows: auto auto 1fr;
  gap: var(--spacing-md) var(--spacing-md);
  grid-template-areas:
    'header header'
    'side-panel panel'
    'side-panel content';

  @media (max-width: 700px) {
    grid-template-columns: minmax(auto, var(--mobile-content-size));
    grid-template-rows: max-content max-content auto 1fr;
    grid-template-areas:
      'header'
      'side-panel'
      'panel'
      'content';
  }
`

const PreloaderWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
`

const HeaderWrapper = styled.div`
  grid-area: header;
`

const SidePanel = styled.div`
  grid-area: side-panel;
`

const Panel = styled.div`
  grid-area: panel;
`

const ContentWrapper = styled.main`
  grid-area: content;
`

export const MainTemplate: React.FC<Props> = ({
  preloader,
  header,
  sidePanel,
  panel,
  children,
}) => (
  <Container>
    <PreloaderWrapper>{preloader}</PreloaderWrapper>
    <HeaderWrapper>{header}</HeaderWrapper>
    <SidePanel>{sidePanel}</SidePanel>
    <Panel>{panel}</Panel>
    <ContentWrapper>{children}</ContentWrapper>
  </Container>
)
