import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { Button } from './index'

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()
  })

  it('renders primary variant', () => {
    render(<Button variant="primary">Primary</Button>)
    const button = screen.getByRole('button', { name: /primary/i })
    expect(button.className).toContain('bg-primary')
    expect(button.className).toContain('text-primary-foreground')
  })

  it('renders secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const button = screen.getByRole('button', { name: /secondary/i })
    expect(button.className).toContain('bg-secondary')
    expect(button.className).toContain('text-secondary-foreground')
  })

  it('renders ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>)
    const button = screen.getByRole('button', { name: /ghost/i })
    expect(button.className).toContain('hover:bg-accent')
    expect(button.className).toContain('hover:text-accent-foreground')
  })

  it('renders destructive variant', () => {
    render(<Button variant="destructive">Destructive</Button>)
    const button = screen.getByRole('button', { name: /destructive/i })
    expect(button.className).toContain('bg-destructive')
    expect(button.className).toContain('text-destructive-foreground')
  })

  it('renders sm size', () => {
    render(<Button size="sm">Small</Button>)
    const button = screen.getByRole('button', { name: /small/i })
    expect(button.className).toContain('h-8')
    expect(button.className).toContain('px-3')
    expect(button.className).toContain('text-xs')
  })

  it('renders md size (default)', () => {
    render(<Button size="md">Medium</Button>)
    const button = screen.getByRole('button', { name: /medium/i })
    expect(button.className).toContain('h-10')
    expect(button.className).toContain('px-4')
    expect(button.className).toContain('text-sm')
  })

  it('renders lg size', () => {
    render(<Button size="lg">Large</Button>)
    const button = screen.getByRole('button', { name: /large/i })
    expect(button.className).toContain('h-12')
    expect(button.className).toContain('px-6')
    expect(button.className).toContain('text-base')
    expect(button.className).toContain('rounded-lg')
  })

  it('shows loading spinner when loading=true', () => {
    render(<Button loading>Loading</Button>)
    const spinner = screen.getByTestId('button-spinner')
    expect(spinner).toBeInTheDocument()
  })

  it('disables the button when loading=true', () => {
    render(<Button loading>Loading</Button>)
    const button = screen.getByRole('button', { name: /loading/i })
    expect(button).toBeDisabled()
  })

  it('has correct aria-busy when loading', () => {
    render(<Button loading>Loading</Button>)
    const button = screen.getByRole('button', { name: /loading/i })
    expect(button).toHaveAttribute('aria-busy', 'true')
  })

  it('does not have aria-busy when not loading', () => {
    render(<Button>Normal</Button>)
    const button = screen.getByRole('button', { name: /normal/i })
    expect(button).not.toHaveAttribute('aria-busy')
  })

  it('renders in disabled state', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button', { name: /disabled/i })
    expect(button).toBeDisabled()
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button disabled onClick={onClick}>
        Disabled
      </Button>,
    )
    const button = screen.getByRole('button', { name: /disabled/i })
    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Ref Button</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    expect(ref.current?.textContent).toBe('Ref Button')
  })

  it('supports className override', () => {
    render(<Button className="custom-class">Styled</Button>)
    const button = screen.getByRole('button', { name: /styled/i })
    expect(button.className).toContain('custom-class')
  })

  it('asChild renders as child element', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>,
    )
    const link = screen.getByRole('link', { name: /link button/i })
    expect(link).toBeInTheDocument()
    expect(link.tagName).toBe('A')
    expect(link).toHaveAttribute('href', '/test')
  })

  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Clickable</Button>)
    const button = screen.getByRole('button', { name: /clickable/i })
    await user.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
