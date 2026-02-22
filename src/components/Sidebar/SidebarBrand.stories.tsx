import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SidebarBrand } from '.'

/* ─── Icons ────────────────────────────────────────── */

const GalleryVerticalEndIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 2h10" />
    <path d="M5 6h14" />
    <rect width="18" height="12" x="3" y="10" rx="2" />
  </svg>
)

const ChevronsUpDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m7 15 5 5 5-5" />
    <path d="m7 9 5-5 5 5" />
  </svg>
)

const CommandIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
  </svg>
)

/* ─── Meta ──────────────────────────────────────────── */

const meta: Meta<typeof SidebarBrand> = {
  title: 'Components/Sidebar/SidebarBrand',
  component: SidebarBrand,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Brand header block for the sidebar. Displays an icon, title, optional description, and trailing element (e.g. dropdown chevrons). Supports size variants and active state.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Controls the size of the icon container, title, and description',
      table: { defaultValue: { summary: 'sm' } },
    },
    active: {
      control: 'boolean',
      description: 'Highlights the brand block as active',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ width: 256 }} className="bg-background-primary-light border border-border-default rounded-lg p-[var(--padding-xxs)]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SidebarBrand>

/* ─── Default ──────────────────────────────────────── */

export const Default: Story = {
  args: {
    icon: <GalleryVerticalEndIcon />,
    title: 'Documentation',
    description: 'V1.0.0',
    trailing: <ChevronsUpDownIcon />,
  },
}

/* ─── With Description ─────────────────────────────── */

export const WithDescription: Story = {
  args: {
    icon: <GalleryVerticalEndIcon />,
    title: 'Acme Corp',
    description: 'Enterprise Plan',
    trailing: <ChevronsUpDownIcon />,
  },
}

/* ─── Custom Icon ──────────────────────────────────── */

export const CustomIcon: Story = {
  args: {
    icon: <CommandIcon />,
    title: 'Acme Inc',
    description: 'v2.3.1',
    trailing: <ChevronsUpDownIcon />,
  },
}

/* ─── Title Only ───────────────────────────────────── */

export const TitleOnly: Story = {
  args: {
    icon: <GalleryVerticalEndIcon />,
    title: 'My App',
  },
}

/* ─── Active State ─────────────────────────────────── */

export const ActiveState: Story = {
  args: {
    icon: <GalleryVerticalEndIcon />,
    title: 'Documentation',
    description: 'V1.0.0',
    trailing: <ChevronsUpDownIcon />,
    active: true,
  },
}

/* ─── All Sizes ────────────────────────────────────── */

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <div key={s}>
          <span style={{ fontSize: 11, color: '#888', marginBottom: 4, display: 'block' }}>size=&quot;{s}&quot;</span>
          <SidebarBrand
            size={s}
            icon={<GalleryVerticalEndIcon />}
            title="Documentation"
            description="V1.0.0"
            trailing={<ChevronsUpDownIcon />}
          />
        </div>
      ))}
    </div>
  ),
}
