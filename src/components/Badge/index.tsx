import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium',
  {
    variants: {
      variant: {
        success: 'bg-success text-success-foreground',
        warning: 'bg-warning text-warning-foreground',
        error: 'bg-destructive/10 text-destructive',
        info: 'bg-info text-info-foreground',
        neutral: 'bg-secondary text-secondary-foreground',
      },
      size: {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-xs px-2.5 py-1',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export { Badge, badgeVariants }
