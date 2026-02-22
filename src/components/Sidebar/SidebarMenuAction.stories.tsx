import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
} from '.'

/* ─── Icons ────────────────────────────────────────── */

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </svg>
)

const MoreHorizontalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
)

/* ─── Meta ──────────────────────────────────────────── */

const meta: Meta<typeof SidebarMenuAction> = {
  title: 'Components/Sidebar/SidebarMenuAction',
  component: SidebarMenuAction,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An action button that appears on hover over a SidebarMenuItem. Typically used for context menus or quick actions like "more options".',
      },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ width: 256, height: 300, display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SidebarMenuAction>

/* ─── Default (hover to reveal) ────────────────────── */

export const Default: Story = {
  render: () => (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<FolderIcon />}>
                Design Engineering
              </SidebarMenuButton>
              <SidebarMenuAction aria-label="More options">
                <MoreHorizontalIcon />
              </SidebarMenuAction>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<FolderIcon />}>
                Sales &amp; Marketing
              </SidebarMenuButton>
              <SidebarMenuAction aria-label="More options">
                <MoreHorizontalIcon />
              </SidebarMenuAction>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<FolderIcon />}>
                Travel
              </SidebarMenuButton>
              <SidebarMenuAction aria-label="More options">
                <MoreHorizontalIcon />
              </SidebarMenuAction>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ),
}
