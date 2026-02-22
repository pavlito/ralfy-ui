import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../lib/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-[var(--spacing-sm)] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-primary-default focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-[var(--radius-md)]',
  {
    variants: {
      variant: {
        default:
          'bg-background-primary-default text-foreground-primary-default hover:bg-background-primary-default-hover',
        secondary:
          'bg-background-primary-light text-foreground-accent hover:bg-background-primary-light-hover',
        destructive:
          'bg-background-destructive-default text-foreground-primary-default hover:bg-background-destructive-default-hover',
        outline:
          'border border-border-default bg-transparent text-foreground-default hover:bg-background-accent',
        ghost:
          'bg-transparent text-foreground-default hover:bg-background-accent',
        link: 'bg-transparent text-foreground-default underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-10 px-[var(--padding-sm)] py-[var(--padding-xxs)] text-sm',
        md: 'h-11 px-[var(--padding-sm)] py-[var(--padding-xxs)] text-base',
        lg: 'h-12 px-[var(--padding-sm)] py-[var(--padding-xxs)] text-base',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
)

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      data-testid="button-spinner"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** When true, the button renders as its child element (e.g. an anchor tag). */
  asChild?: boolean
  /** Shows a loading spinner and disables the button. */
  loading?: boolean
  /** Icon to show on the left side of the button text. */
  iconLeft?: React.ReactNode
  /** Icon to show on the right side of the button text. */
  iconRight?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      children,
      iconLeft,
      iconRight,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading ? 'true' : undefined}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {loading && <Spinner />}
            {iconLeft}
            {children}
            {iconRight}
          </>
        )}
      </Comp>
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
