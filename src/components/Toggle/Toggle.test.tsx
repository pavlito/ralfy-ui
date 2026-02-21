import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as React from 'react'
import { Toggle } from './index'

describe('Toggle', () => {
  it('renders with label', () => {
    render(<Toggle label="Enable notifications" />)
    expect(screen.getByText('Enable notifications')).toBeInTheDocument()
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('renders without label', () => {
    render(<Toggle />)
    expect(screen.getByRole('switch')).toBeInTheDocument()
    expect(screen.queryByRole('label')).not.toBeInTheDocument()
  })

  it('is clickable and changes state', async () => {
    const user = userEvent.setup()
    render(<Toggle label="Toggle me" />)

    const toggle = screen.getByRole('switch')
    expect(toggle).toHaveAttribute('data-state', 'unchecked')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('data-state', 'checked')

    await user.click(toggle)
    expect(toggle).toHaveAttribute('data-state', 'unchecked')
  })

  it('disabled state prevents interaction', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()

    render(
      <Toggle disabled onCheckedChange={onCheckedChange} label="Disabled toggle" />
    )

    const toggle = screen.getByRole('switch')
    expect(toggle).toBeDisabled()

    await user.click(toggle)
    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLButtonElement>()
    render(<Toggle ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })

  it('supports className override', () => {
    render(<Toggle className="custom-class" />)
    const toggle = screen.getByRole('switch')
    expect(toggle).toHaveClass('custom-class')
  })

  it('has correct role=switch', () => {
    render(<Toggle />)
    const toggle = screen.getByRole('switch')
    expect(toggle).toBeInTheDocument()
  })

  it('works in controlled mode', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()

    const { rerender } = render(
      <Toggle checked={false} onCheckedChange={onCheckedChange} label="Controlled" />
    )

    const toggle = screen.getByRole('switch')
    expect(toggle).toHaveAttribute('data-state', 'unchecked')

    await user.click(toggle)
    expect(onCheckedChange).toHaveBeenCalledWith(true)

    // Since it's controlled, state doesn't change until prop changes
    expect(toggle).toHaveAttribute('data-state', 'unchecked')

    // Simulate parent updating the prop
    rerender(
      <Toggle checked={true} onCheckedChange={onCheckedChange} label="Controlled" />
    )
    expect(toggle).toHaveAttribute('data-state', 'checked')
  })
})
