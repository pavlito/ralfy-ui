import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const tabItemVariants = cva(
  'inline-flex items-center justify-center px-[var(--padding-xs)] py-1.5 rounded-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-primary-default focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      active: {
        true: 'bg-background-default text-foreground-default shadow-sm',
        false: 'bg-transparent text-foreground-muted',
      },
    },
    defaultVariants: {
      size: 'sm',
      active: false,
    },
  },
)

export interface TabItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof tabItemVariants>, 'active'> {
  /** Whether this tab item is currently active/selected. */
  active?: boolean
}

const TabItem = React.forwardRef<HTMLButtonElement, TabItemProps>(
  ({ className, size, active = false, ...props }, ref) => {
    return (
      <button
        className={cn(tabItemVariants({ size, active, className }))}
        ref={ref}
        role="tab"
        aria-selected={active}
        {...props}
      />
    )
  },
)

TabItem.displayName = 'TabItem'

export { TabItem, tabItemVariants }
