import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { TabItem } from '.'

describe('TabItem', () => {
  it('renders with role="tab"', () => {
    render(<TabItem>Tab</TabItem>)
    expect(screen.getByRole('tab', { name: 'Tab' })).toBeInTheDocument()
  })

  it('sets aria-selected=false by default', () => {
    render(<TabItem>Tab</TabItem>)
    expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'false')
  })

  it('sets aria-selected=true when active', () => {
    render(<TabItem active>Tab</TabItem>)
    expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'true')
  })

  it('applies active variant classes', () => {
    render(<TabItem active>Active</TabItem>)
    expect(screen.getByRole('tab').className).toContain('bg-background-default')
  })

  it('applies inactive variant classes', () => {
    render(<TabItem>Inactive</TabItem>)
    expect(screen.getByRole('tab').className).toContain('bg-transparent')
  })

  it('applies size variant', () => {
    render(<TabItem size="lg">Large</TabItem>)
    expect(screen.getByRole('tab').className).toContain('text-lg')
  })

  it('handles click events', async () => {
    const onClick = vi.fn()
    render(<TabItem onClick={onClick}>Click</TabItem>)
    await userEvent.click(screen.getByRole('tab'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('is disabled when disabled prop is true', () => {
    render(<TabItem disabled>Disabled</TabItem>)
    expect(screen.getByRole('tab')).toBeDisabled()
  })

  it('merges custom className', () => {
    render(<TabItem className="custom-class">Custom</TabItem>)
    expect(screen.getByRole('tab').className).toContain('custom-class')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<TabItem ref={ref}>Ref</TabItem>)
    expect(ref).toHaveBeenCalled()
  })

  it('renders icon before label', () => {
    render(<TabItem icon={<svg data-testid="icon" />}>With Icon</TabItem>)
    const tab = screen.getByRole('tab')
    expect(tab.querySelector('[data-testid="icon"]')).toBeInTheDocument()
  })

  it('does not render icon wrapper when no icon', () => {
    render(<TabItem>No Icon</TabItem>)
    const tab = screen.getByRole('tab')
    expect(tab.querySelector('span')).not.toBeInTheDocument()
  })
})
