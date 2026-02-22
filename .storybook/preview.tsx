import type { Preview } from '@storybook/react-vite'
import { withThemeByClassName } from '@storybook/addon-themes'
import '../src/tokens/tokens.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    backgrounds: { disable: true },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        Light: '',
        Dark: 'dark',
      },
      defaultTheme: 'Light',
    }),
    (Story) => (
      <div
        className="bg-background-default text-foreground-default"
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          minHeight: '100%',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default preview
