import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

const ralfyTheme = create({
  base: 'dark',
  brandTitle: 'Ralfy-UI',
  brandUrl: 'https://github.com/pavlito/ralfy-ui',
  colorPrimary: '#6366f1',
  colorSecondary: '#6366f1',
  appBg: '#0f1117',
  appContentBg: '#161822',
  appBorderColor: '#2a2d3a',
  textColor: '#e8eaf0',
  textMutedColor: '#8b8fa4',
  barTextColor: '#8b8fa4',
  barSelectedColor: '#6366f1',
  barBg: '#0f1117',
})

addons.setConfig({
  theme: ralfyTheme,
})
