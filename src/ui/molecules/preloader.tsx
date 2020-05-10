import React from 'react'
import styled, { css } from 'styled-components'

type Props = {
  finished: boolean
}

const Wrapper = styled.div`
  height: 4px;
  width: 100%;
  top: 0;
  overflow: hidden;
  transform: translate(0);
  opacity: 1;
  animation: loader-blink 0.8s;

  @keyframes loader-blink {
    0% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const Stripes = styled.div<Props>`
  width: 120%;
  height: 4px;
  background-size: 228px 32px;
  backface-visibility: hidden;
  will-change: transform;
  position: absolute;
  top: 0;
  background-color: var(--blue);
  background-image: repeating-linear-gradient(
    135deg,
    var(--blue-lighter),
    var(--blue-lighter) var(--spacing-md),
    var(--blue) 0,
    var(--blue) var(--spacing-lg)
  );

  animation: loader-stripes 0.5s infinite linear;
  opacity: 1;
  transition: opacity 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);

  ${({ finished }) =>
    finished &&
    css`
      animation: none;
      opacity: 0;
    `}

  @keyframes loader-stripes {
    0% {
      transform: translateX(0) translateZ(0);
    }
    to {
      transform: translateX(-56px) translateZ(0);
    }
  }
`

const Bar = styled.div<Props>`
  width: 100%;
  height: 100%;
  transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1),
    opacity 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  backface-visibility: hidden;
  will-change: transform;
  overflow: hidden;
  background-color: #eff1f4;
  transform: translateX(0) translateZ(0);
  animation: show-search-main-progress 10s cubic-bezier(0.215, 0.61, 0.355, 1);

  ${({ finished }) =>
    finished &&
    css`
      transform: translateX(100%) translateZ(0);
      animation: hide-search-progress 0.5s ease-in-out;
    `}

  @keyframes show-search-main-progress {
    0% {
      transform: translateX(0) translateZ(0);
    }
    20% {
      transform: translateX(20%) translateZ(0);
    }
    40% {
      transform: translateX(40%) translateZ(0);
    }
    60% {
      transform: translateX(60%) translateZ(0);
    }
    80% {
      transform: translateX(80%) translateZ(0);
    }
    to {
      transform: translateX(100%) translateZ(0);
    }
  }
`

export const Preloader: React.FC<Props> = ({ finished }) => (
  <Wrapper>
    <Stripes finished={finished} />
    <Bar finished={finished} />
  </Wrapper>
)
