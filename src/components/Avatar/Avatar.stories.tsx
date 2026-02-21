import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar } from './index'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=ralfy',
    alt: 'User avatar',
    fallback: 'PL',
  },
}

export const WithFallback: Story = {
  args: {
    fallback: 'PL',
    size: 'md',
  },
}

export const Small: Story = {
  args: { fallback: 'SM', size: 'sm' },
}

export const Large: Story = {
  args: { fallback: 'LG', size: 'lg' },
}

export const Online: Story = {
  args: { fallback: 'PL', status: 'online' },
}

export const Offline: Story = {
  args: { fallback: 'PL', status: 'offline' },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar fallback="SM" size="sm" />
      <Avatar fallback="MD" size="md" />
      <Avatar fallback="LG" size="lg" />
    </div>
  ),
}

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar fallback="ON" status="online" />
      <Avatar fallback="OF" status="offline" />
      <Avatar fallback="NO" />
    </div>
  ),
}
