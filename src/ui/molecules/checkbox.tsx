import React from 'react'
import styled from 'styled-components'

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
    background-color: var(--blue-light);
  }
`
const Input = styled.input`
  width: var(--spacing-md);
  height: var(--spacing-md);
  margin-right: var(--spacing-sm);
  border: 1px solid var(--blue);
  border-radius: var(--border-radius-xs);
  appearance: none;
  cursor: pointer;

  &:checked {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aCBkPSJNNC4yODU3MSA4TDAgNC4xNjEyM0wxLjIwODU3IDMuMDc4N0w0LjI4NTcxIDUuODI3MjZMMTAuNzkxNCAwTDEyIDEuMDkwMjFMNC4yODU3MSA4WiIgZmlsbD0iIzIxOTZGMyIvPgogICAgPC9zdmc+');
    background-repeat: no-repeat;
    background-position: center;
    border: 1px solid var(--primary);
  }
`

export const Checkbox: React.FC<Props> = ({ children, checked, onChange, id }) => (
  <Label htmlFor={id}>
    <Input id={id} type="checkbox" checked={checked} onChange={onChange} />
    {children}
  </Label>
)
