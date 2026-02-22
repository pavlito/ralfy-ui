import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import type { SidebarMenuButtonProps } from '.'
import { SidebarMenuButton } from '.'

/* ─── Icons ─────────────────────────────────────────── */

const TerminalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" x2="20" y1="19" y2="19" />
  </svg>
)

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const meta: Meta<typeof SidebarMenuButton> = {
  title: 'Components/Sidebar/SidebarMenuButton',
  component: SidebarMenuButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The primary interactive element inside a Sidebar. Supports icons, keyboard shortcuts, active state, size variants, and collapsed mode.',
      },
    },
  },
  argTypes: {
    active: {
      control: 'boolean',
      description: 'Highlights the button as the currently active item',
      table: { defaultValue: { summary: 'false' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Controls the size of the button, icon, and text',
      table: { defaultValue: { summary: 'sm' } },
    },
    icon: {
      description: 'Icon element rendered before the label',
      table: { type: { summary: 'ReactNode' } },
    },
    shortcut: {
      control: 'text',
      description: 'Keyboard shortcut hint displayed on the right',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    children: { control: 'text' },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ width: 240 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SidebarMenuButton>

export const Default: Story = {
  args: {
    children: 'Installation',
  },
}

export const WithIcon: Story = {
  args: {
    children: 'Dashboard',
    icon: <HomeIcon />,
  },
}

export const Active: Story = {
  args: {
    children: 'Dashboard',
    icon: <HomeIcon />,
    active: true,
  },
}

export const WithShortcut: Story = {
  args: {
    children: 'Search',
    icon: <TerminalIcon />,
    shortcut: '⌘K',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Item',
    icon: <HomeIcon />,
    disabled: true,
  },
}

export const WithRightIcon: Story = {
  args: {
    children: 'Models',
    icon: <HomeIcon />,
    rightIcon: <ChevronRightIcon />,
  },
}

export const WithLeftChevron: Story = {
  args: {
    children: 'Playground',
    icon: <HomeIcon />,
    showLeftChevron: true,
    leftChevron: <ChevronDownIcon />,
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, width: 720 }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <div key={s} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>size=&quot;{s}&quot;</span>
          <SidebarMenuButton size={s} icon={<HomeIcon />}>Dashboard</SidebarMenuButton>
          <SidebarMenuButton size={s} icon={<TerminalIcon />} active>Active</SidebarMenuButton>
          <SidebarMenuButton size={s} icon={<TerminalIcon />} shortcut="⌘K">With shortcut</SidebarMenuButton>
          <SidebarMenuButton size={s} icon={<HomeIcon />} rightIcon={<ChevronRightIcon />}>Right icon</SidebarMenuButton>
          <SidebarMenuButton size={s} icon={<HomeIcon />} disabled>Disabled</SidebarMenuButton>
        </div>
      ))}
    </div>
  ),
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 240 }}>
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 11, color: '#888' }}>Text only</span>
        <SidebarMenuButton>Installation</SidebarMenuButton>
      </div>
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 11, color: '#888' }}>With icon</span>
        <SidebarMenuButton icon={<HomeIcon />}>Dashboard</SidebarMenuButton>
      </div>
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 11, color: '#888' }}>Active</span>
        <SidebarMenuButton icon={<HomeIcon />} active>Dashboard</SidebarMenuButton>
      </div>
      <div style={{ marginBottom: 8 }}>
        <span style={{ fontSize: 11, color: '#888' }}>With shortcut</span>
        <SidebarMenuButton icon={<TerminalIcon />} shortcut="⌘K">Terminal</SidebarMenuButton>
      </div>
      <div>
        <span style={{ fontSize: 11, color: '#888' }}>Disabled</span>
        <SidebarMenuButton icon={<HomeIcon />} disabled>Disabled</SidebarMenuButton>
      </div>
    </div>
  ),
}
