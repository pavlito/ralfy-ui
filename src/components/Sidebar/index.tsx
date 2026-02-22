import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

/* ─── Shared Constants ──────────────────────────────── */

type SidebarSize = 'sm' | 'md' | 'lg'

const SIDEBAR_FOCUS_RING = [
  'focus-visible:outline-none',
  'relative',
  'focus-visible:after:absolute',
  'focus-visible:after:inset-0',
  'focus-visible:after:border-2',
  'focus-visible:after:border-border-primary-default',
  'focus-visible:after:opacity-50',
  'focus-visible:after:rounded-sm',
  'focus-visible:after:pointer-events-none',
].join(' ')

const ICON_SIZE: Record<SidebarSize, string> = { sm: 'size-4', md: 'size-5', lg: 'size-6' }
const SHORTCUT_SIZE: Record<SidebarSize, string> = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' }

/* ─── Sidebar (root container) ──────────────────────── */

const sidebarVariants = cva(
  'flex flex-col bg-background-primary-light border border-border-default',
  {
    variants: {
      side: {
        left: 'rounded-l-lg',
        right: 'rounded-r-lg',
      },
    },
    defaultVariants: {
      side: 'left',
    },
  },
)

type SidebarProps = React.ComponentPropsWithoutRef<'aside'> &
  VariantProps<typeof sidebarVariants> & {
    collapsed?: boolean
  }

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, side, collapsed = false, ...props }, ref) => (
    <aside
      ref={ref}
      data-collapsed={collapsed || undefined}
      className={cn(
        'group/sidebar',
        sidebarVariants({ side }),
        collapsed ? 'w-[var(--sidebar-collapsed-width,48px)]' : 'w-[var(--sidebar-width,256px)]',
        className,
      )}
      {...props}
    />
  ),
)
Sidebar.displayName = 'Sidebar'

/* ─── SidebarHeader ─────────────────────────────────── */

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col gap-[var(--spacing-sm)] p-[var(--padding-xxs)]',
      className,
    )}
    {...props}
  />
))
SidebarHeader.displayName = 'SidebarHeader'

/* ─── SidebarContent ────────────────────────────────── */

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-1 flex-col gap-0 overflow-y-auto p-[var(--padding-xxs)]',
      className,
    )}
    {...props}
  />
))
SidebarContent.displayName = 'SidebarContent'

/* ─── SidebarFooter ─────────────────────────────────── */

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col gap-[var(--spacing-sm)] p-[var(--padding-xxs)]',
      className,
    )}
    {...props}
  />
))
SidebarFooter.displayName = 'SidebarFooter'

/* ─── SidebarGroup ──────────────────────────────────── */

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('relative flex flex-col', className)}
    {...props}
  />
))
SidebarGroup.displayName = 'SidebarGroup'

/* ─── SidebarGroupLabel ─────────────────────────────── */

const sidebarGroupLabelVariants = cva(
  'px-[var(--padding-xxs)] py-1.5 font-semibold text-foreground-muted',
  {
    variants: {
      size: { sm: 'text-xs', md: 'text-sm', lg: 'text-base' },
    },
    defaultVariants: { size: 'sm' },
  },
)

type SidebarGroupLabelProps = React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof sidebarGroupLabelVariants>

const SidebarGroupLabel = React.forwardRef<HTMLDivElement, SidebarGroupLabelProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(sidebarGroupLabelVariants({ size }), className)}
      {...props}
    />
  ),
)
SidebarGroupLabel.displayName = 'SidebarGroupLabel'

/* ─── SidebarMenu ───────────────────────────────────── */

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-col gap-[var(--spacing-xs)]', className)}
    {...props}
  />
))
SidebarMenu.displayName = 'SidebarMenu'

/* ─── SidebarMenuItem ───────────────────────────────── */

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<'li'>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('relative list-none group/menu-item', className)}
    {...props}
  />
))
SidebarMenuItem.displayName = 'SidebarMenuItem'

/* ─── SidebarMenuButton ─────────────────────────────── */

const sidebarMenuButtonVariants = cva(
  [
    'flex w-full items-center',
    'px-[var(--padding-xxs)] py-[6px]',
    'rounded-sm text-foreground-secondary-default',
    'transition-colors cursor-pointer',
    'hover:bg-background-primary-light-hover',
    SIDEBAR_FOCUS_RING,
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      active: {
        true: 'bg-background-primary-light font-medium',
        false: '',
      },
    },
    defaultVariants: { size: 'sm', active: false },
  },
)

type SidebarMenuButtonProps = React.ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof sidebarMenuButtonVariants> & {
    icon?: React.ReactNode
    shortcut?: string
    showLeftChevron?: boolean
    leftChevron?: React.ReactNode
    rightIcon?: React.ReactNode
  }

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuButtonProps
>(({ className, active, size, icon, shortcut, showLeftChevron, leftChevron, rightIcon, disabled, children, ...props }, ref) => {
  const resolvedSize: SidebarSize = size ?? 'sm'
  return (
    <button
      ref={ref}
      data-active={active || undefined}
      disabled={disabled}
      className={cn(
        sidebarMenuButtonVariants({ size, active }),
        disabled && 'opacity-50 text-foreground-accent pointer-events-none',
        'group-data-[collapsed]/sidebar:p-[var(--padding-xxs)] group-data-[collapsed]/sidebar:justify-center',
        className,
      )}
      {...props}
    >
      <span className="flex flex-1 items-center gap-[var(--spacing-xs)] group-data-[collapsed]/sidebar:flex-initial">
        <span className="flex flex-1 items-center gap-[var(--spacing-sm)] group-data-[collapsed]/sidebar:flex-initial">
          {showLeftChevron && leftChevron && (
            <span className={cn('flex shrink-0 items-center justify-center text-icon-muted [&>svg]:size-full group-data-[collapsed]/sidebar:hidden', ICON_SIZE[resolvedSize])}>
              {leftChevron}
            </span>
          )}
          {icon && (
            <span className={cn('flex shrink-0 items-center justify-center text-icon-muted [&>svg]:size-full', ICON_SIZE[resolvedSize])}>
              {icon}
            </span>
          )}
          <span className="flex-1 truncate text-left group-data-[collapsed]/sidebar:hidden">{children}</span>
        </span>
        {shortcut && (
          <span className={cn('text-foreground-muted group-data-[collapsed]/sidebar:hidden', SHORTCUT_SIZE[resolvedSize])}>{shortcut}</span>
        )}
        {rightIcon && (
          <span className={cn('flex shrink-0 items-center justify-center text-icon-muted [&>svg]:size-full group-data-[collapsed]/sidebar:hidden', ICON_SIZE[resolvedSize])}>
            {rightIcon}
          </span>
        )}
      </span>
    </button>
  )
})
SidebarMenuButton.displayName = 'SidebarMenuButton'

/* ─── SidebarSeparator ──────────────────────────────── */

const SidebarSeparator = React.forwardRef<
  HTMLHRElement,
  React.ComponentPropsWithoutRef<'hr'>
>(({ className, ...props }, ref) => (
  <hr
    ref={ref}
    className={cn('border-t border-border-default mx-[var(--padding-xxs)]', className)}
    {...props}
  />
))
SidebarSeparator.displayName = 'SidebarSeparator'

/* ─── SidebarBrand ─────────────────────────────────── */

const sidebarBrandVariants = cva(
  [
    'flex w-full items-center gap-[var(--spacing-sm)]',
    'px-[var(--padding-xxs)] py-[6px] rounded-sm',
    'hover:bg-background-primary-light-hover transition-colors cursor-pointer',
    SIDEBAR_FOCUS_RING,
  ].join(' '),
  {
    variants: {
      size: { sm: '', md: '', lg: '' },
      active: { true: 'bg-background-primary-light', false: '' },
    },
    defaultVariants: { size: 'sm', active: false },
  },
)

const BRAND_ICON_CONTAINER: Record<SidebarSize, string> = { sm: 'size-8', md: 'size-9', lg: 'size-10' }
const BRAND_TITLE_SIZE: Record<SidebarSize, string> = { sm: 'text-sm', md: 'text-base', lg: 'text-lg' }
const BRAND_DESC_SIZE: Record<SidebarSize, string> = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' }

type SidebarBrandProps = React.ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof sidebarBrandVariants> & {
    icon?: React.ReactNode
    title: string
    description?: string
    trailing?: React.ReactNode
  }

const SidebarBrand = React.forwardRef<HTMLButtonElement, SidebarBrandProps>(
  ({ className, icon, title, description, trailing, size, active, ...props }, ref) => {
    const resolvedSize: SidebarSize = size ?? 'sm'
    return (
      <button
        ref={ref}
        data-active={active || undefined}
        className={cn(sidebarBrandVariants({ size, active }), className)}
        {...props}
      >
        {icon && (
          <span className={cn(
            'flex shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-background-primary-default text-white [&>svg]:size-full',
            BRAND_ICON_CONTAINER[resolvedSize],
          )}>
            {icon}
          </span>
        )}
        <span className="flex flex-1 flex-col items-start text-left min-w-0">
          <span className={cn('font-semibold text-foreground-secondary-default truncate w-full', BRAND_TITLE_SIZE[resolvedSize])}>
            {title}
          </span>
          {description && (
            <span className={cn('text-foreground-muted truncate w-full', BRAND_DESC_SIZE[resolvedSize])}>
              {description}
            </span>
          )}
        </span>
        {trailing && (
          <span className={cn('flex shrink-0 items-center justify-center text-icon-muted [&>svg]:size-full', ICON_SIZE[resolvedSize])}>
            {trailing}
          </span>
        )}
      </button>
    )
  },
)
SidebarBrand.displayName = 'SidebarBrand'

/* ─── SidebarGroupAction ──────────────────────────── */

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'absolute right-2 top-2 flex items-center justify-center size-4 text-icon-muted hover:text-icon-default transition-colors cursor-pointer',
      className,
    )}
    {...props}
  />
))
SidebarGroupAction.displayName = 'SidebarGroupAction'

/* ─── SidebarMenuAction ───────────────────────────── */

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<'button'>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center size-4 text-icon-muted hover:text-icon-default opacity-0 group-hover/menu-item:opacity-100 transition-all cursor-pointer',
      className,
    )}
    {...props}
  />
))
SidebarMenuAction.displayName = 'SidebarMenuAction'

/* ─── SidebarMenuSub ──────────────────────────────── */

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      'ml-4 border-l border-border-default pl-2 flex flex-col gap-[var(--spacing-xs)]',
      className,
    )}
    {...props}
  />
))
SidebarMenuSub.displayName = 'SidebarMenuSub'

/* ─── SidebarMenuSubItem ──────────────────────────── */

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<'li'>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('list-none', className)}
    {...props}
  />
))
SidebarMenuSubItem.displayName = 'SidebarMenuSubItem'

/* ─── SidebarMenuSubButton ────────────────────────── */

const sidebarMenuSubButtonVariants = cva(
  [
    'flex w-full items-center px-[var(--padding-xxs)] py-1 rounded-sm',
    'text-foreground-secondary-default',
    'hover:bg-background-primary-light-hover transition-colors cursor-pointer',
    SIDEBAR_FOCUS_RING,
  ].join(' '),
  {
    variants: {
      size: { sm: 'text-sm', md: 'text-sm', lg: 'text-base' },
      active: { true: 'bg-background-primary-light font-medium', false: '' },
    },
    defaultVariants: { size: 'sm', active: false },
  },
)

type SidebarMenuSubButtonProps = React.ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof sidebarMenuSubButtonVariants>

const SidebarMenuSubButton = React.forwardRef<
  HTMLButtonElement,
  SidebarMenuSubButtonProps
>(({ className, size, active, ...props }, ref) => (
  <button
    ref={ref}
    data-active={active || undefined}
    className={cn(sidebarMenuSubButtonVariants({ size, active }), className)}
    {...props}
  />
))
SidebarMenuSubButton.displayName = 'SidebarMenuSubButton'

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  SidebarBrand,
  SidebarGroupAction,
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
}

export type {
  SidebarSize,
  SidebarProps,
  SidebarMenuButtonProps,
  SidebarBrandProps,
  SidebarGroupLabelProps,
  SidebarMenuSubButtonProps,
}
