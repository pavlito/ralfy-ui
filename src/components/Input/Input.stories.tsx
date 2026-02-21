import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './index'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search'],
    },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: { label: 'Email', placeholder: 'you@example.com' },
}

export const WithHelperText: Story = {
  args: { label: 'Display Name', helperText: 'This will be shown publicly', placeholder: 'Enter name' },
}

export const WithError: Story = {
  args: { label: 'Password', errorMessage: 'Password is required', type: 'password' },
}

export const WithIcon: Story = {
  args: {
    placeholder: 'Search...',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    ),
  },
}

export const Disabled: Story = {
  args: { label: 'Disabled', placeholder: 'Cannot edit', disabled: true },
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '320px' }}>
      <Input label="Default" placeholder="Enter text" />
      <Input label="With Helper" helperText="Helper text here" placeholder="Enter text" />
      <Input label="With Error" errorMessage="This field is required" />
      <Input label="Disabled" disabled placeholder="Cannot edit" />
      <Input
        placeholder="Search..."
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        }
      />
    </div>
  ),
}
