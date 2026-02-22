import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarBrand,
} from '.'

describe('Sidebar', () => {
  it('renders as aside element', () => {
    render(<Sidebar data-testid="sidebar">Content</Sidebar>)
    const sidebar = screen.getByTestId('sidebar')
    expect(sidebar.tagName).toBe('ASIDE')
  })

  it('applies left side variant by default', () => {
    render(<Sidebar data-testid="sidebar">Content</Sidebar>)
    expect(screen.getByTestId('sidebar').className).toContain('rounded-l-lg')
  })

  it('applies right side variant', () => {
    render(<Sidebar side="right" data-testid="sidebar">Content</Sidebar>)
    expect(screen.getByTestId('sidebar').className).toContain('rounded-r-lg')
  })

  it('sets data-collapsed when collapsed', () => {
    render(<Sidebar collapsed data-testid="sidebar">Content</Sidebar>)
    expect(screen.getByTestId('sidebar')).toHaveAttribute('data-collapsed', 'true')
  })

  it('does not set data-collapsed when not collapsed', () => {
    render(<Sidebar data-testid="sidebar">Content</Sidebar>)
    expect(screen.getByTestId('sidebar')).not.toHaveAttribute('data-collapsed')
  })

  it('merges custom className', () => {
    render(<Sidebar className="custom-class" data-testid="sidebar">Content</Sidebar>)
    expect(screen.getByTestId('sidebar').className).toContain('custom-class')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<Sidebar ref={ref}>Content</Sidebar>)
    expect(ref).toHaveBeenCalled()
  })
})

describe('Sidebar compound components', () => {
  it('renders full sidebar structure', () => {
    render(
      <Sidebar data-testid="sidebar">
        <SidebarHeader data-testid="header">Header</SidebarHeader>
        <SidebarContent data-testid="content">
          <SidebarGroup>
            <SidebarGroupLabel>Label</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>Item 1</SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter data-testid="footer">Footer</SidebarFooter>
      </Sidebar>,
    )
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('content')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
    expect(screen.getByText('Label')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
  })
})

describe('SidebarMenuButton', () => {
  it('renders as button', () => {
    render(<SidebarMenuButton>Click</SidebarMenuButton>)
    expect(screen.getByRole('button', { name: 'Click' })).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const onClick = vi.fn()
    render(<SidebarMenuButton onClick={onClick}>Click</SidebarMenuButton>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('renders icon when provided', () => {
    render(
      <SidebarMenuButton icon={<span data-testid="icon">I</span>}>
        Item
      </SidebarMenuButton>,
    )
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('sets data-active when active', () => {
    render(<SidebarMenuButton active>Active</SidebarMenuButton>)
    expect(screen.getByRole('button')).toHaveAttribute('data-active', 'true')
  })

  it('is disabled when disabled prop is true', () => {
    render(<SidebarMenuButton disabled>Disabled</SidebarMenuButton>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})

describe('SidebarBrand', () => {
  it('renders title', () => {
    render(<SidebarBrand title="Brand" />)
    expect(screen.getByText('Brand')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<SidebarBrand title="Brand" description="v1.0" />)
    expect(screen.getByText('v1.0')).toBeInTheDocument()
  })

  it('renders icon when provided', () => {
    render(<SidebarBrand title="Brand" icon={<span data-testid="brand-icon">B</span>} />)
    expect(screen.getByTestId('brand-icon')).toBeInTheDocument()
  })
})

describe('SidebarSeparator', () => {
  it('renders as hr element', () => {
    render(<SidebarSeparator data-testid="sep" />)
    expect(screen.getByTestId('sep').tagName).toBe('HR')
  })
})
