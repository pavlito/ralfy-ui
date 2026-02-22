import type { Meta, StoryObj } from '@storybook/react'
import { TabItem } from '.'

const meta: Meta<typeof TabItem> = {
  title: 'Components/TabItem',
  component: TabItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A single tab trigger item used within a tab list. Supports active/inactive states and three sizes.',
      },
    },
  },
  argTypes: {
    active: {
      control: 'boolean',
      description: 'Whether the tab is currently selected.',
      table: { defaultValue: { summary: 'false' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the tab item.',
      table: { defaultValue: { summary: 'sm' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tab item is disabled.',
      table: { defaultValue: { summary: 'false' } },
    },
    children: {
      control: 'text',
      description: 'The tab label text.',
    },
  },
}
export default meta
type Story = StoryObj<typeof TabItem>

export const Default: Story = {
  args: {
    children: 'Account',
    active: false,
    size: 'sm',
  },
}

export const Active: Story = {
  args: {
    children: 'Account',
    active: true,
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    children: 'Account',
    active: true,
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    children: 'Account',
    active: true,
    size: 'lg',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Account',
    active: false,
    disabled: true,
  },
}

const sizes = ['sm', 'md', 'lg'] as const

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {sizes.map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 40, fontSize: 12, color: '#888' }}>{size}</span>
          <TabItem size={size} active>
            Active
          </TabItem>
          <TabItem size={size}>Inactive</TabItem>
          <TabItem size={size} disabled>
            Disabled
          </TabItem>
        </div>
      ))}
    </div>
  ),
}

