import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '../../lib/cn'

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string
  id?: string
  className?: string
}

const Toggle = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  ToggleProps
>(({ checked, defaultChecked, onCheckedChange, disabled, label, id, className, ...props }, ref) => {
  const generatedId = React.useId()
  const resolvedId = id ?? generatedId

  return (
    <div className="flex items-center gap-2">
      {label && (
        <label
          htmlFor={resolvedId}
          className="text-sm font-medium text-foreground cursor-pointer"
        >
          {label}
        </label>
      )}
      <SwitchPrimitive.Root
        ref={ref}
        id={resolvedId}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={cn(
          'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform',
            'data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0'
          )}
        />
      </SwitchPrimitive.Root>
    </div>
  )
})

Toggle.displayName = 'Toggle'

export { Toggle }
