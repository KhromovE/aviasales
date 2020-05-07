import styled, { css } from 'styled-components'

type Props = {
  active: boolean
}

export const Tab = styled.li<Props>`
  flex: 1;
  list-style-type: none;
  padding: 15px 0;
  border: 1px solid var(--gray-light);
  font-size: var(--font-size-xs);
  line-height: 20px;
  font-weight: var(--font-weight-bold);
  letter-spacing: var(--letter-spacing);
  text-align: center;
  text-transform: uppercase;
  background-color: var(--white);
  cursor: pointer;

  &:first-child {
    border-top-left-radius: var(--border-radius-md);
    border-bottom-left-radius: var(--border-radius-md);
  }

  &:last-child {
    border-top-right-radius: var(--border-radius-md);
    border-bottom-right-radius: var(--border-radius-md);
  }

  ${({ active }) =>
    active &&
    css`
      color: var(--white);
      background-color: var(--primary);
      border: none;
    `}
`
