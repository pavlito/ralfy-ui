import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '.'

describe('Tabs', () => {
  const renderTabs = (defaultValue = 'tab1') => {
    return render(
      <Tabs defaultValue={defaultValue}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    )
  }

  it('renders tab triggers', () => {
    renderTabs()
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument()
  })

  it('shows content for default tab', () => {
    renderTabs('tab1')
    expect(screen.getByText('Content 1')).toBeInTheDocument()
  })

  it('switches content on tab click', async () => {
    renderTabs('tab1')
    await userEvent.click(screen.getByRole('tab', { name: 'Tab 2' }))
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('marks active tab with data-state=active', () => {
    renderTabs('tab1')
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('data-state', 'active')
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('data-state', 'inactive')
  })
})

describe('TabsList', () => {
  it('renders with role="tablist"', () => {
    render(
      <Tabs defaultValue="t1">
        <TabsList>
          <TabsTrigger value="t1">T</TabsTrigger>
        </TabsList>
      </Tabs>,
    )
    expect(screen.getByRole('tablist')).toBeInTheDocument()
  })

  it('applies bg-background-muted class', () => {
    render(
      <Tabs defaultValue="t1">
        <TabsList>
          <TabsTrigger value="t1">T</TabsTrigger>
        </TabsList>
      </Tabs>,
    )
    expect(screen.getByRole('tablist').className).toContain('bg-background-muted')
  })

  it('merges custom className', () => {
    render(
      <Tabs defaultValue="t1">
        <TabsList className="custom-class">
          <TabsTrigger value="t1">T</TabsTrigger>
        </TabsList>
      </Tabs>,
    )
    expect(screen.getByRole('tablist').className).toContain('custom-class')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(
      <Tabs defaultValue="t1">
        <TabsList ref={ref}>
          <TabsTrigger value="t1">T</TabsTrigger>
        </TabsList>
      </Tabs>,
    )
    expect(ref).toHaveBeenCalled()
  })
})
