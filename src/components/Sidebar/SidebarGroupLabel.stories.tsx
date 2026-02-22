import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SidebarGroupLabel } from '.'

const meta: Meta<typeof SidebarGroupLabel> = {
  title: 'Components/Sidebar/SidebarGroupLabel',
  component: SidebarGroupLabel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A small section heading used inside SidebarGroup to label a group of menu items. Renders as muted, semibold text. Supports size variants.',
      },
    },
  },
  argTypes: {
    children: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Controls the text size of the label',
      table: { defaultValue: { summary: 'sm' } },
    },
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
type Story = StoryObj<typeof SidebarGroupLabel>

export const Default: Story = {
  args: {
    children: 'Getting Started',
  },
}

export const Examples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 240 }}>
      <SidebarGroupLabel>Getting Started</SidebarGroupLabel>
      <SidebarGroupLabel>Building Your Application</SidebarGroupLabel>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 240 }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <div key={s}>
          <span style={{ fontSize: 11, color: '#888', marginBottom: 4, display: 'block' }}>size=&quot;{s}&quot;</span>
          <SidebarGroupLabel size={s}>Getting Started</SidebarGroupLabel>
        </div>
      ))}
    </div>
  ),
}
