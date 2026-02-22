import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Alert, AlertTitle, AlertDescription } from '.'

describe('Alert', () => {
  it('renders with role="alert"', () => {
    render(<Alert>Content</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(<Alert>Alert message</Alert>)
    expect(screen.getByText('Alert message')).toBeInTheDocument()
  })

  it('applies default variant classes', () => {
    render(<Alert>Default</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert.className).toContain('border-border-default')
  })

  it('applies destructive variant classes', () => {
    render(<Alert variant="destructive">Error</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert.className).toContain('border-border-destructive-default')
  })

  it('applies warning variant classes', () => {
    render(<Alert variant="warning">Warning</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert.className).toContain('border-border-warning-default')
  })

  it('applies success variant classes', () => {
    render(<Alert variant="success">Success</Alert>)
    const alert = screen.getByRole('alert')
    expect(alert.className).toContain('border-border-success-default')
  })

  it('renders icon when provided', () => {
    render(<Alert icon={<span data-testid="alert-icon">!</span>}>Text</Alert>)
    expect(screen.getByTestId('alert-icon')).toBeInTheDocument()
  })

  it('merges custom className', () => {
    render(<Alert className="custom-class">Custom</Alert>)
    expect(screen.getByRole('alert').className).toContain('custom-class')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<Alert ref={ref}>Ref</Alert>)
    expect(ref).toHaveBeenCalled()
  })
})

describe('AlertTitle', () => {
  it('renders as h5', () => {
    render(<AlertTitle>Title</AlertTitle>)
    const title = screen.getByText('Title')
    expect(title.tagName).toBe('H5')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<AlertTitle ref={ref}>Title</AlertTitle>)
    expect(ref).toHaveBeenCalled()
  })
})

describe('AlertDescription', () => {
  it('renders with data-slot="description"', () => {
    render(<AlertDescription>Description</AlertDescription>)
    const desc = screen.getByText('Description')
    expect(desc).toHaveAttribute('data-slot', 'description')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<AlertDescription ref={ref}>Desc</AlertDescription>)
    expect(ref).toHaveBeenCalled()
  })
})
