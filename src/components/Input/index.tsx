import * as React from 'react'
import { cn } from '../../lib/cn'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string
  helperText?: string
  errorMessage?: string
  icon?: React.ReactNode
  className?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      icon,
      disabled,
      type,
      className,
      id: externalId,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId()
    const inputId = externalId ?? generatedId
    const errorId = `${inputId}-error`

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            'flex items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
            errorMessage && 'border-destructive',
            disabled && 'cursor-not-allowed opacity-50',
            className,
          )}
        >
          {icon && <span className="mr-2 text-muted-foreground">{icon}</span>}
          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            aria-describedby={errorMessage ? errorId : undefined}
            aria-invalid={errorMessage ? true : undefined}
            className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            {...props}
          />
        </div>
        {errorMessage && (
          <p id={errorId} className="text-xs text-destructive">
            {errorMessage}
          </p>
        )}
        {helperText && !errorMessage && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
