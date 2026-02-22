import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const alertVariants = cva(
  'relative w-full border bg-background-default overflow-clip p-[var(--padding-sm)] rounded-md',
  {
    variants: {
      variant: {
        default:
          'border-border-default text-foreground-default [&_[data-slot=description]]:text-foreground-muted',
        destructive:
          'border-border-destructive-default text-foreground-destructive-default',
        warning:
          'border-border-warning-default text-foreground-warning-default',
        success:
          'border-border-success-default text-foreground-success-default',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Icon rendered to the left of the title. */
  icon?: React.ReactNode
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, icon, children, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <div className="flex gap-[var(--spacing-md)]">
        {icon && (
          <span className="shrink-0 size-5 [&>svg]:size-5">{icon}</span>
        )}
        <div className="flex-1 flex flex-col gap-1">{children}</div>
      </div>
    </div>
  ),
)
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('font-medium text-base leading-6', className)}
    {...props}
  />
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="description"
    className={cn('text-sm leading-5', className)}
    {...props}
  />
))
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription, alertVariants }
