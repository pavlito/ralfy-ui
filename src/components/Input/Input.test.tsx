import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { Input } from './index'

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('renders placeholder', () => {
    render(<Input placeholder="you@example.com" />)
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
  })

  it('shows helper text', () => {
    render(<Input helperText="Your display name" />)
    expect(screen.getByText('Your display name')).toBeInTheDocument()
  })

  it('shows error message', () => {
    render(<Input errorMessage="Required" />)
    expect(screen.getByText('Required')).toBeInTheDocument()
  })

  it('error message has aria-describedby linking', () => {
    render(<Input id="test-input" errorMessage="Required" />)
    const input = screen.getByRole('textbox')
    const errorElement = screen.getByText('Required')

    expect(input).toHaveAttribute('aria-describedby', 'test-input-error')
    expect(errorElement).toHaveAttribute('id', 'test-input-error')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('shows icon', () => {
    render(<Input icon={<span data-testid="search-icon">S</span>} />)
    expect(screen.getByTestId('search-icon')).toBeInTheDocument()
  })

  it('disabled state', () => {
    render(<Input disabled label="Disabled" />)
    expect(screen.getByLabelText('Disabled')).toBeDisabled()
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLInputElement>()
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('supports className override', () => {
    const { container } = render(<Input className="custom-class" />)
    const inputContainer = container.querySelector('.custom-class')
    expect(inputContainer).toBeInTheDocument()
  })

  it('accepts type prop', () => {
    render(<Input type="password" label="Password" />)
    expect(screen.getByLabelText('Password')).toHaveAttribute(
      'type',
      'password',
    )
  })
})
