import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Toggle } from './index'

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  args: { label: 'Enable notifications' },
}

export const Checked: Story = {
  args: { label: 'Dark mode', defaultChecked: true },
}

export const Disabled: Story = {
  args: { label: 'Disabled toggle', disabled: true },
}

export const DisabledChecked: Story = {
  args: { label: 'Disabled checked', disabled: true, defaultChecked: true },
}

export const WithoutLabel: Story = {
  args: {},
}

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Toggle
          checked={checked}
          onCheckedChange={setChecked}
          label="Controlled toggle"
        />
        <p style={{ fontSize: '14px', opacity: 0.6 }}>
          State: {checked ? 'ON' : 'OFF'}
        </p>
      </div>
    )
  },
}
