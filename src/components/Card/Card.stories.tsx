import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './index'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: (args) => (
    <Card {...args} style={{ width: '380px' }}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description with supporting text.</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ fontSize: '14px' }}>Card content goes here. This is the main body area.</p>
      </CardContent>
      <CardFooter>
        <p style={{ fontSize: '12px', opacity: 0.6 }}>Card footer</p>
      </CardFooter>
    </Card>
  ),
}

export const Outlined: Story = {
  render: () => (
    <Card variant="outlined" style={{ width: '380px' }}>
      <CardHeader>
        <CardTitle>Outlined Card</CardTitle>
        <CardDescription>With a more prominent border.</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ fontSize: '14px' }}>Content for the outlined variant.</p>
      </CardContent>
    </Card>
  ),
}

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated" style={{ width: '380px' }}>
      <CardHeader>
        <CardTitle>Elevated Card</CardTitle>
        <CardDescription>With a shadow for depth.</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ fontSize: '14px' }}>Content for the elevated variant.</p>
      </CardContent>
    </Card>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {(['default', 'outlined', 'elevated'] as const).map((variant) => (
        <Card key={variant} variant={variant} style={{ width: '280px' }}>
          <CardHeader>
            <CardTitle>{variant.charAt(0).toUpperCase() + variant.slice(1)}</CardTitle>
            <CardDescription>The {variant} variant.</CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ fontSize: '14px' }}>Sample content</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}
