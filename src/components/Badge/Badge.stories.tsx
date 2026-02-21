import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './index'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Success: Story = {
  args: { children: 'Active', variant: 'success' },
}

export const Warning: Story = {
  args: { children: 'Pending', variant: 'warning' },
}

export const Error: Story = {
  args: { children: 'Failed', variant: 'error' },
}

export const Info: Story = {
  args: { children: 'New', variant: 'info' },
}

export const Neutral: Story = {
  args: { children: 'Draft', variant: 'neutral' },
}

export const Small: Story = {
  args: { children: 'Small', size: 'sm', variant: 'info' },
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="error">Failed</Badge>
      <Badge variant="info">New</Badge>
      <Badge variant="neutral">Draft</Badge>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge size="sm" variant="info">Small</Badge>
      <Badge size="md" variant="info">Medium</Badge>
    </div>
  ),
}
