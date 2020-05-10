import React from 'react'
import styled from 'styled-components'
import CheckIcon from '../../assets/images/check.svg'

type Props = {
  id: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Label = styled.label`
  display: flex;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-sm);
  line-height: 20px;
  cursor: pointer;

  &:hover {
    background-color: var(--blue-lighest);
  }
`
const Input = styled.input`
  width: var(--spacing-md);
  height: var(--spacing-md);
  margin-right: var(--spacing-sm);
  border: 1px solid var(--blue);
  border-radius: var(--border-radius-xs);
  appearance: none;
  outline: none;
  cursor: pointer;

  &:checked {
    border: 1px solid var(--primary);
  }
`

const CheckWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--spacing-md);
  height: var(--spacing-md);
`

export const Checkbox: React.FC<Props> = ({ children, checked, onChange, id }) => (
  <Label htmlFor={id}>
    {checked && (
      <CheckWrapper>
        <CheckIcon />
      </CheckWrapper>
    )}
    <Input id={id} type="checkbox" checked={checked} onChange={onChange} />
    {children}
  </Label>
)
