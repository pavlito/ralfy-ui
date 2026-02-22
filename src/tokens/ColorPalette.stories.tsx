import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Tokens/Color Palette',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'All design tokens generated from Figma via Tokens Studio → Style Dictionary. These CSS variables are the single source of truth for colors across Storybook and production.',
      },
    },
  },
}

export default meta
type Story = StoryObj

interface SwatchProps {
  token: string
  label?: string
}

function Swatch({ token, label }: SwatchProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 8,
          backgroundColor: `var(--${token})`,
          border: '1px solid var(--border-default)',
          flexShrink: 0,
        }}
      />
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, fontFamily: 'monospace' }}>
          --{token}
        </div>
        {label && (
          <div style={{ fontSize: 11, color: 'var(--foreground-muted)', marginTop: 2 }}>
            {label}
          </div>
        )}
      </div>
    </div>
  )
}

interface SectionProps {
  title: string
  children: React.ReactNode
}

function Section({ title, children }: SectionProps) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h3 style={{
        fontSize: 14,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: 'var(--foreground-muted)',
        marginBottom: 16,
        paddingBottom: 8,
        borderBottom: '1px solid var(--border-default)',
      }}>
        {title}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {children}
      </div>
    </div>
  )
}

export const Backgrounds: Story = {
  render: () => (
    <div>
      <Section title="Page & Surface">
        <Swatch token="background-default" label="Page background" />
        <Swatch token="background-card" label="Elevated surface" />
        <Swatch token="background-popover" label="Popover surface" />
        <Swatch token="background-input" label="Form field background" />
        <Swatch token="background-muted" label="Muted surface" />
        <Swatch token="background-accent" label="Accent surface" />
      </Section>

      <Section title="Primary">
        <Swatch token="background-primary-default" label="Primary button / CTA" />
        <Swatch token="background-primary-default-hover" label="Primary hover" />
        <Swatch token="background-primary-light" label="Primary light surface — sidebar" />
        <Swatch token="background-primary-light-hover" label="Primary light hover" />
      </Section>

      <Section title="Secondary">
        <Swatch token="background-secondary-default" label="Secondary button" />
      </Section>

      <Section title="Semantic">
        <Swatch token="background-destructive-default" label="Destructive / Error" />
        <Swatch token="background-destructive-light" label="Destructive light surface" />
        <Swatch token="background-success-default" label="Success" />
        <Swatch token="background-success-light" label="Success light surface" />
        <Swatch token="background-warning-default" label="Warning" />
        <Swatch token="background-warning-light" label="Warning light surface" />
        <Swatch token="background-disabled-default" label="Disabled" />
      </Section>
    </div>
  ),
}

export const Foregrounds: Story = {
  render: () => (
    <div>
      <Section title="Text">
        <Swatch token="foreground-default" label="Default body text" />
        <Swatch token="foreground-muted" label="Muted / secondary text" />
        <Swatch token="foreground-accent" label="Accent text" />
        <Swatch token="foreground-primary-default" label="Primary colored text" />
        <Swatch token="foreground-secondary-default" label="Secondary colored text" />
        <Swatch token="foreground-disabled-default" label="Disabled text" />
      </Section>

      <Section title="Semantic Text">
        <Swatch token="foreground-destructive-default" label="Error / destructive" />
        <Swatch token="foreground-success-default" label="Success" />
        <Swatch token="foreground-warning-default" label="Warning" />
      </Section>
    </div>
  ),
}

export const Borders: Story = {
  render: () => (
    <Section title="Borders">
      <Swatch token="border-default" label="Default border" />
      <Swatch token="border-primary-default" label="Primary / focus ring" />
      <Swatch token="border-destructive-default" label="Destructive border" />
      <Swatch token="border-success-default" label="Success border" />
      <Swatch token="border-warning-default" label="Warning border" />
    </Section>
  ),
}

export const Icons: Story = {
  render: () => (
    <Section title="Icons">
      <Swatch token="icon-default" label="Default icon" />
      <Swatch token="icon-muted" label="Muted icon" />
      <Swatch token="icon-accent" label="Accent icon" />
      <Swatch token="icon-primary-default" label="Primary icon" />
      <Swatch token="icon-secondary-default" label="Secondary icon" />
      <Swatch token="icon-destructive-default" label="Destructive icon" />
      <Swatch token="icon-success-default" label="Success icon" />
      <Swatch token="icon-warning-default" label="Warning icon" />
      <Swatch token="icon-disabled-default" label="Disabled icon" />
    </Section>
  ),
}

export const AllTokens: Story = {
  name: 'All Tokens (Overview)',
  render: () => (
    <div>
      <Section title="Backgrounds — Page & Surface">
        <Swatch token="background-default" label="Page background" />
        <Swatch token="background-card" label="Elevated surface" />
        <Swatch token="background-popover" label="Popover surface" />
        <Swatch token="background-input" label="Form field background" />
        <Swatch token="background-muted" label="Muted surface" />
        <Swatch token="background-accent" label="Accent surface" />
      </Section>

      <Section title="Backgrounds — Primary">
        <Swatch token="background-primary-default" label="Primary button / CTA" />
        <Swatch token="background-primary-light" label="Primary light surface — sidebar" />
      </Section>

      <Section title="Backgrounds — Semantic">
        <Swatch token="background-destructive-default" label="Destructive" />
        <Swatch token="background-success-default" label="Success" />
        <Swatch token="background-warning-default" label="Warning" />
      </Section>

      <Section title="Foregrounds">
        <Swatch token="foreground-default" label="Default" />
        <Swatch token="foreground-muted" label="Muted" />
        <Swatch token="foreground-primary-default" label="Primary" />
        <Swatch token="foreground-destructive-default" label="Error" />
        <Swatch token="foreground-success-default" label="Success" />
        <Swatch token="foreground-warning-default" label="Warning" />
      </Section>

      <Section title="Borders">
        <Swatch token="border-default" label="Default" />
        <Swatch token="border-primary-default" label="Focus ring" />
        <Swatch token="border-destructive-default" label="Error" />
      </Section>
    </div>
  ),
}
