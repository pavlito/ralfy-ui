import type { Meta, StoryObj } from '@storybook/react'
import { Alert, AlertTitle, AlertDescription } from '.'

const TerminalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" x2="20" y1="19" y2="19" />
  </svg>
)

const CircleAlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
)

const CircleCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Displays a callout for user attention. Supports default, destructive, warning, and success variants with an optional icon.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'warning', 'success'],
      description: 'Visual style of the alert',
      table: { defaultValue: { summary: 'default' } },
    },
    icon: {
      description: 'Icon rendered to the left of the title',
      table: { type: { summary: 'ReactNode' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  render: (args) => (
    <Alert {...args} icon={<TerminalIcon />}>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'default',
  },
}

export const Destructive: Story = {
  render: (args) => (
    <Alert {...args} icon={<CircleAlertIcon />}>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'destructive',
  },
}

export const Warning: Story = {
  render: (args) => (
    <Alert {...args} icon={<CircleAlertIcon />}>
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'warning',
  },
}

export const Success: Story = {
  render: (args) => (
    <Alert {...args} icon={<CircleCheckIcon />}>
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'success',
  },
}

export const WithoutIcon: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
  args: {
    variant: 'default',
  },
}

export const TitleOnly: Story = {
  render: (args) => (
    <Alert {...args} icon={<TerminalIcon />}>
      <AlertTitle>Heads up!</AlertTitle>
    </Alert>
  ),
  args: {
    variant: 'default',
  },
}

const variants = ['default', 'destructive', 'warning', 'success'] as const

const variantIcons: Record<string, React.ReactNode> = {
  default: <TerminalIcon />,
  destructive: <CircleAlertIcon />,
  warning: <CircleAlertIcon />,
  success: <CircleCheckIcon />,
}

const variantTitles: Record<string, string> = {
  default: 'Heads up!',
  destructive: 'Error',
  warning: 'Warning',
  success: 'Success',
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 600 }}>
      {variants.map((variant) => (
        <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 12, color: '#888' }}>{variant}</span>
          <Alert variant={variant} icon={variantIcons[variant]}>
            <AlertTitle>{variantTitles[variant]}</AlertTitle>
            <AlertDescription>
              You can add components to your app using the cli.
            </AlertDescription>
          </Alert>
        </div>
      ))}
    </div>
  ),
}
