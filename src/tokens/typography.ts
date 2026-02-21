/**
 * JS typography tokens for inline styles (extension surface).
 */

export const fontFamily = {
  sans: "'Inter', system-ui, -apple-system, sans-serif",
  mono: "'JetBrains Mono', monospace",
} as const

export const fontSize = {
  xs: '12px',
  sm: '14px',
  base: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '30px',
} as const

export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const

export const lineHeight = {
  tight: '1.25',
  normal: '1.5',
  relaxed: '1.625',
} as const
