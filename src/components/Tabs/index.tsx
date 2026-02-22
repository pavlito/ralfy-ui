import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '../../lib/cn'
import { tabItemVariants } from '../TabItem'
import type { VariantProps } from 'class-variance-authority'

/* ── Tabs (Root) ── */

const Tabs = TabsPrimitive.Root

/* ── TabsList ── */

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {}

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex items-center bg-background-muted p-[var(--spacing-xs)] rounded-md',
      className,
    )}
    {...props}
  />
))
TabsList.displayName = 'TabsList'

/* ── TabsTrigger ── */

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    Omit<VariantProps<typeof tabItemVariants>, 'active'> {}

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, size, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      tabItemVariants({ size, active: false }),
      'flex-1 data-[state=active]:bg-background-default data-[state=active]:text-foreground-default data-[state=active]:shadow-sm',
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = 'TabsTrigger'

/* ── TabsContent ── */

export interface TabsContentProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> {}

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-[var(--spacing-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-primary-default focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
))
TabsContent.displayName = 'TabsContent'

export { Tabs, TabsList, TabsTrigger, TabsContent }
