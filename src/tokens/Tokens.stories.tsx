import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Design Tokens/Overview',
}

export default meta
type Story = StoryObj

const ColorSwatch = ({ name, variable }: { name: string; variable: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0' }}>
    <div
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        backgroundColor: `var(${variable})`,
        border: '1px solid var(--border)',
        flexShrink: 0,
      }}
    />
    <div>
      <div style={{ fontSize: '14px', fontWeight: 500 }}>{name}</div>
      <div style={{ fontSize: '12px', opacity: 0.5, fontFamily: 'monospace' }}>{variable}</div>
    </div>
  </div>
)

export const SemanticColors: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>Semantic Colors</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Backgrounds</h3>
          <ColorSwatch name="Background" variable="--background" />
          <ColorSwatch name="Card" variable="--card" />
          <ColorSwatch name="Primary" variable="--primary" />
          <ColorSwatch name="Secondary" variable="--secondary" />
          <ColorSwatch name="Muted" variable="--muted" />
          <ColorSwatch name="Accent" variable="--accent" />
          <ColorSwatch name="Destructive" variable="--destructive" />
        </div>
        <div>
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Foregrounds</h3>
          <ColorSwatch name="Foreground" variable="--foreground" />
          <ColorSwatch name="Card" variable="--card-foreground" />
          <ColorSwatch name="Primary" variable="--primary-foreground" />
          <ColorSwatch name="Secondary" variable="--secondary-foreground" />
          <ColorSwatch name="Muted" variable="--muted-foreground" />
          <ColorSwatch name="Destructive" variable="--destructive-foreground" />
        </div>
      </div>

      <h3 style={{ fontSize: '14px', fontWeight: 600, marginTop: '32px', marginBottom: '8px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status Colors</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
        <div>
          <ColorSwatch name="Success" variable="--success" />
          <ColorSwatch name="Warning" variable="--warning" />
          <ColorSwatch name="Info" variable="--info" />
        </div>
        <div>
          <ColorSwatch name="Success Text" variable="--success-foreground" />
          <ColorSwatch name="Warning Text" variable="--warning-foreground" />
          <ColorSwatch name="Info Text" variable="--info-foreground" />
        </div>
      </div>

      <h3 style={{ fontSize: '14px', fontWeight: 600, marginTop: '32px', marginBottom: '8px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Utility</h3>
      <ColorSwatch name="Border" variable="--border" />
      <ColorSwatch name="Input" variable="--input" />
      <ColorSwatch name="Ring" variable="--ring" />
    </div>
  ),
}

export const Typography: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>Typography Scale</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {[
          { class: 'text-3xl', size: '30px', label: 'text-3xl' },
          { class: 'text-2xl', size: '24px', label: 'text-2xl' },
          { class: 'text-xl', size: '20px', label: 'text-xl' },
          { class: 'text-lg', size: '18px', label: 'text-lg' },
          { class: 'text-base', size: '16px', label: 'text-base' },
          { class: 'text-sm', size: '14px', label: 'text-sm' },
          { class: 'text-xs', size: '12px', label: 'text-xs' },
        ].map((item) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
            <span style={{ fontSize: item.size, fontWeight: 600, minWidth: '200px' }}>
              The quick brown fox
            </span>
            <span style={{ fontSize: '12px', opacity: 0.5, fontFamily: 'monospace' }}>
              {item.label} ({item.size})
            </span>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: '14px', fontWeight: 600, marginTop: '32px', marginBottom: '16px', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Font Weights</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '16px' }}>
        <div><span style={{ fontWeight: 400 }}>Normal (400)</span> — <code style={{ fontSize: '12px', opacity: 0.5 }}>font-normal</code></div>
        <div><span style={{ fontWeight: 500 }}>Medium (500)</span> — <code style={{ fontSize: '12px', opacity: 0.5 }}>font-medium</code></div>
        <div><span style={{ fontWeight: 600 }}>Semibold (600)</span> — <code style={{ fontSize: '12px', opacity: 0.5 }}>font-semibold</code></div>
        <div><span style={{ fontWeight: 700 }}>Bold (700)</span> — <code style={{ fontSize: '12px', opacity: 0.5 }}>font-bold</code></div>
      </div>
    </div>
  ),
}

export const Spacing: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>Spacing Scale</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[
          { name: 'xs', value: '4px' },
          { name: 'sm', value: '8px' },
          { name: 'md', value: '16px' },
          { name: 'lg', value: '24px' },
          { name: 'xl', value: '32px' },
          { name: '2xl', value: '48px' },
          { name: '3xl', value: '64px' },
        ].map((item) => (
          <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: item.value,
                height: '24px',
                backgroundColor: 'var(--primary)',
                borderRadius: '4px',
                opacity: 0.7,
              }}
            />
            <span style={{ fontSize: '14px', fontWeight: 500, minWidth: '40px' }}>{item.name}</span>
            <span style={{ fontSize: '12px', opacity: 0.5, fontFamily: 'monospace' }}>
              --spacing-{item.name} ({item.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
}
