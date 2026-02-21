import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const avatarVariants = cva('relative flex shrink-0 items-center justify-center', {
  variants: {
    size: {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-14 w-14 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

const statusSizeMap = {
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
} as const

function StatusIndicator({
  status,
  size = 'md',
}: {
  status: 'online' | 'offline'
  size?: 'sm' | 'md' | 'lg'
}) {
  return (
    <span
      data-testid="status-indicator"
      data-status={status}
      className={cn(
        'absolute bottom-0 right-0 rounded-full ring-2 ring-background',
        statusSizeMap[size],
        status === 'offline' && 'bg-muted-foreground',
      )}
      style={status === 'online' ? { backgroundColor: 'oklch(0.64 0.17 155)' } : undefined}
    />
  )
}

export type AvatarProps = {
  src?: string
  alt?: string
  fallback: string
  size?: 'sm' | 'md' | 'lg'
  status?: 'online' | 'offline'
  className?: string
} & VariantProps<typeof avatarVariants>

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, fallback, size = 'md', status, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('relative inline-flex', className)} {...props}>
        <AvatarPrimitive.Root
          className={cn(avatarVariants({ size }), 'overflow-hidden rounded-full')}
        >
          <AvatarPrimitive.Image
            className="h-full w-full object-cover"
            src={src}
            alt={alt}
          />
          <AvatarPrimitive.Fallback
            className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground font-medium"
          >
            {fallback}
          </AvatarPrimitive.Fallback>
        </AvatarPrimitive.Root>
        {status && <StatusIndicator status={status} size={size} />}
      </div>
    )
  },
)

Avatar.displayName = 'Avatar'

export { Avatar }
