import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '.'

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
)

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A polymorphic button component with 6 visual variants, 4 sizes, loading state, and icon support. Supports `asChild` to render as any element (e.g. anchor tag). Built with Figma design tokens.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
      description: 'Visual style of the button',
      table: { defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
      description: 'Button size — sm (40px), md (44px), lg (48px), icon (40x40)',
      table: { defaultValue: { summary: 'md' } },
    },
    loading: {
      control: 'boolean',
      description: 'Shows a spinner and disables the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    iconLeft: {
      description: 'Icon element rendered before the label',
      table: { type: { summary: 'ReactNode' } },
    },
    iconRight: {
      description: 'Icon element rendered after the label',
      table: { type: { summary: 'ReactNode' } },
    },
    asChild: {
      control: 'boolean',
      description: 'Renders as its child element (e.g. an anchor tag) via Radix Slot',
      table: { defaultValue: { summary: 'false' } },
    },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'md',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
}

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
}

export const Link: Story = {
  args: {
    children: 'Link',
    variant: 'link',
  },
}

export const WithLeftIcon: Story = {
  args: {
    children: 'Email',
    iconLeft: <MailIcon />,
  },
}

export const WithRightIcon: Story = {
  args: {
    children: 'Next',
    iconRight: <ChevronRightIcon />,
  },
}

export const WithBothIcons: Story = {
  args: {
    children: 'Send',
    iconLeft: <MailIcon />,
    iconRight: <ChevronRightIcon />,
  },
}

export const IconOnly: Story = {
  args: {
    size: 'icon',
    children: <MailIcon />,
    'aria-label': 'Send email',
  },
}

export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'lg',
  },
}

export const Loading: Story = {
  args: {
    children: 'Loading...',
    loading: true,
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
}

export const AsLink: Story = {
  args: {
    asChild: true,
    children: <a href="/example">Link Button</a>,
  },
}

const variants = ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const
const sizes = ['sm', 'md', 'lg'] as const

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {variants.map((variant) => (
        <div key={variant} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 100, fontSize: 12, color: '#888' }}>{variant}</span>
          <Button variant={variant}>Label</Button>
          <Button variant={variant} iconLeft={<MailIcon />}>Email</Button>
          <Button variant={variant} iconRight={<ChevronRightIcon />}>Next</Button>
          <Button variant={variant} disabled>Disabled</Button>
          <Button variant={variant} loading>Loading</Button>
        </div>
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'end', gap: 12 }}>
      {sizes.map((size) => (
        <Button key={size} size={size}>
          {size.toUpperCase()}
        </Button>
      ))}
      <Button size="icon" aria-label="Mail">
        <MailIcon />
      </Button>
    </div>
  ),
}
