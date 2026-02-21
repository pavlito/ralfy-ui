import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { Badge } from './index'

describe('Badge', () => {
  it('renders with default props', () => {
    render(<Badge>Default</Badge>)
    const badge = screen.getByText('Default')
    expect(badge).toBeInTheDocument()
    expect(badge.tagName).toBe('SPAN')
    expect(badge.className).toContain('bg-secondary')
    expect(badge.className).toContain('text-secondary-foreground')
  })

  it('renders success variant', () => {
    render(<Badge variant="success">Active</Badge>)
    const badge = screen.getByText('Active')
    expect(badge.className).toContain('bg-success')
    expect(badge.className).toContain('text-success-foreground')
  })

  it('renders warning variant', () => {
    render(<Badge variant="warning">Pending</Badge>)
    const badge = screen.getByText('Pending')
    expect(badge.className).toContain('bg-warning')
    expect(badge.className).toContain('text-warning-foreground')
  })

  it('renders error variant', () => {
    render(<Badge variant="error">Failed</Badge>)
    const badge = screen.getByText('Failed')
    expect(badge.className).toContain('bg-destructive/10')
    expect(badge.className).toContain('text-destructive')
  })

  it('renders info variant', () => {
    render(<Badge variant="info">New</Badge>)
    const badge = screen.getByText('New')
    expect(badge.className).toContain('bg-info')
    expect(badge.className).toContain('text-info-foreground')
  })

  it('renders neutral variant', () => {
    render(<Badge variant="neutral">Draft</Badge>)
    const badge = screen.getByText('Draft')
    expect(badge.className).toContain('bg-secondary')
    expect(badge.className).toContain('text-secondary-foreground')
  })

  it('renders sm size', () => {
    render(<Badge size="sm">Small</Badge>)
    const badge = screen.getByText('Small')
    expect(badge.className).toContain('px-2')
    expect(badge.className).toContain('py-0.5')
  })

  it('renders md size (default)', () => {
    render(<Badge size="md">Medium</Badge>)
    const badge = screen.getByText('Medium')
    expect(badge.className).toContain('px-2.5')
    expect(badge.className).toContain('py-1')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLSpanElement>()
    render(<Badge ref={ref}>Ref Badge</Badge>)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
    expect(ref.current?.textContent).toBe('Ref Badge')
  })

  it('supports className override', () => {
    render(<Badge className="custom-class">Custom</Badge>)
    const badge = screen.getByText('Custom')
    expect(badge.className).toContain('custom-class')
  })

  it('renders children text', () => {
    render(<Badge>Hello World</Badge>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })
})
