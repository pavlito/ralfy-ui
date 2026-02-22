import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import type { SidebarProps } from '.'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
  SidebarBrand,
} from '.'
/* Input component was removed — use plain <input> for search in stories */

/* ─── Icons (inline SVGs matching Figma) ────────────── */

const GalleryVerticalEndIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 2h10" />
    <path d="M5 6h14" />
    <rect width="18" height="12" x="3" y="10" rx="2" />
  </svg>
)

const ChevronsUpDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m7 15 5 5 5-5" />
    <path d="m7 9 5-5 5 5" />
  </svg>
)

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
)

const InboxIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
)

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const PlaygroundIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" x2="20" y1="19" y2="19" />
  </svg>
)

const ModelsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" x2="12" y1="22.08" y2="12" />
  </svg>
)

const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
)

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
  </svg>
)

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
)

const MoreHorizontalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
)

/* ─── Reusable footer user block ───────────────────── */

function SidebarUserFooter() {
  return (
    <SidebarFooter>
      <SidebarBrand
        icon={
          <span className="flex shrink-0 items-center justify-center size-8 rounded-[var(--radius-full)] bg-background-muted text-foreground-muted text-xs font-medium !bg-background-muted">
            SH
          </span>
        }
        title="Shadcn"
        description="m@example.com"
        trailing={<ChevronsUpDownIcon />}
        className="[&>span:first-child]:!bg-transparent"
      />
    </SidebarFooter>
  )
}

/* ─── Meta ──────────────────────────────────────────── */

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A compound sidebar navigation component with header, content groups, menu items, and footer. Supports collapsible state and left/right placement. Built from Figma design tokens.',
      },
    },
  },
  argTypes: {
    side: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Which side the sidebar attaches to, affecting border-radius',
      table: { defaultValue: { summary: 'left' } },
    },
    collapsed: {
      control: 'boolean',
      description: 'Whether the sidebar is in collapsed (icon-only) state',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ height: 712, display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Sidebar>

/* ─── Grouped by Section (matches Figma default) ────── */

export const GroupedBySection: Story = {
  render: (args: SidebarProps) => (
    <Sidebar {...args}>
      <SidebarHeader>
        <SidebarBrand
          icon={<GalleryVerticalEndIcon />}
          title="Documentation"
          description="V1.0.0"
          trailing={<ChevronsUpDownIcon />}
        />
        <div className="px-2">
          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-icon-muted"><SearchIcon /></span>
            <input placeholder="Search" className="w-full rounded-[var(--radius-md)] border border-border-default bg-background-input px-3 py-1.5 pl-8 text-sm text-foreground-default placeholder:text-foreground-muted outline-none" />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Getting Started</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>Installation</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Project Structure</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Building Your Application</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>Routing</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Data Fetching</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Rendering</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Caching</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Styling</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Optimizing</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Configuring</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Testing</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ),
}

/* ─── With Icons (matches Figma "With Icons") ───────── */

export const WithIcons: Story = {
  render: (args: SidebarProps) => (
    <Sidebar {...args}>
      <SidebarHeader>
        <SidebarBrand
          icon={<GalleryVerticalEndIcon />}
          title="Documentation"
          description="V1.0.0"
          trailing={<ChevronsUpDownIcon />}
        />
        <div className="px-2">
          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-icon-muted"><SearchIcon /></span>
            <input placeholder="Search" className="w-full rounded-[var(--radius-md)] border border-border-default bg-background-input px-3 py-1.5 pl-8 text-sm text-foreground-default placeholder:text-foreground-muted outline-none" />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<PlaygroundIcon />}>
                Playground
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<ModelsIcon />}>
                Models
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<BookOpenIcon />}>
                Documentation
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<SettingsIcon />}>
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<FolderIcon />}>
                Design Engineering
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<FolderIcon />}>
                Sales &amp; Marketing
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarUserFooter />
    </Sidebar>
  ),
}

/* ─── With Submenu (matches Figma "With submenu") ───── */

export const WithSubmenu: Story = {
  render: (args: SidebarProps) => (
    <Sidebar {...args}>
      <SidebarHeader>
        <SidebarBrand
          icon={<GalleryVerticalEndIcon />}
          title="Documentation"
          description="V1.0.0"
          trailing={<ChevronsUpDownIcon />}
        />
        <div className="px-2">
          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-icon-muted"><SearchIcon /></span>
            <input placeholder="Search" className="w-full rounded-[var(--radius-md)] border border-border-default bg-background-input px-3 py-1.5 pl-8 text-sm text-foreground-default placeholder:text-foreground-muted outline-none" />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Getting Started</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>Installation</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Project Structure</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Building Your Application</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>Routing</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Data Fetching</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Rendering</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Caching</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Styling</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Optimizing</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Configuring</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Testing</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ),
}

/* ─── With Collapsible Submenus (using SidebarMenuSub) ── */

export const WithCollapsibleSubmenus: Story = {
  render: (args: SidebarProps) => (
    <Sidebar {...args}>
      <SidebarHeader>
        <SidebarBrand
          icon={<GalleryVerticalEndIcon />}
          title="Documentation"
          description="V1.0.0"
          trailing={<ChevronsUpDownIcon />}
        />
        <div className="px-2">
          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-icon-muted"><SearchIcon /></span>
            <input placeholder="Search" className="w-full rounded-[var(--radius-md)] border border-border-default bg-background-input px-3 py-1.5 pl-8 text-sm text-foreground-default placeholder:text-foreground-muted outline-none" />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<PlaygroundIcon />}>
                <span className="flex-1">Playground</span>
                <span className="flex shrink-0 items-center justify-center size-4 text-icon-muted"><ChevronDownIcon /></span>
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>History</SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>Starred</SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>Settings</SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<ModelsIcon />}>
                <span className="flex-1">Models</span>
                <span className="flex shrink-0 items-center justify-center size-4 text-icon-muted"><ChevronRightIcon /></span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<BookOpenIcon />}>
                <span className="flex-1">Documentation</span>
                <span className="flex shrink-0 items-center justify-center size-4 text-icon-muted"><ChevronRightIcon /></span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<SettingsIcon />}>
                <span className="flex-1">Settings</span>
                <span className="flex shrink-0 items-center justify-center size-4 text-icon-muted"><ChevronRightIcon /></span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<FolderIcon />}>
                Design Engineering
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<FolderIcon />}>
                Sales &amp; Marketing
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarUserFooter />
    </Sidebar>
  ),
}

/* ─── With Separator ────────────────────────────────── */

export const WithSeparator: Story = {
  render: (args: SidebarProps) => (
    <Sidebar {...args}>
      <SidebarHeader>
        <SidebarBrand
          icon={<GalleryVerticalEndIcon />}
          title="Workspace"
          description="Team Plan"
          trailing={<ChevronsUpDownIcon />}
        />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<HomeIcon />} active>Dashboard</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<InboxIcon />}>Inbox</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<SettingsIcon />}>Preferences</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ),
}

/* ─── Right Side ────────────────────────────────────── */

export const RightSide: Story = {
  args: { side: 'right' },
  render: (args: SidebarProps) => (
    <Sidebar {...args}>
      <SidebarHeader>
        <SidebarBrand
          icon={<GalleryVerticalEndIcon />}
          title="Details"
          description="Inspector"
          trailing={<ChevronsUpDownIcon />}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Properties</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>Layout</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Spacing</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Typography</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ),
}

/* ─── Collapsible Section ───────────────────────────── */

export const CollapsibleSection: Story = {
  render: (args: SidebarProps) => (
    <Sidebar {...args}>
      <SidebarHeader>
        <SidebarBrand
          icon={<GalleryVerticalEndIcon />}
          title="Documentation"
          description="V1.0.0"
          trailing={<ChevronsUpDownIcon />}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center cursor-pointer">
            <span className="flex-1">Getting Started</span>
            <span className="flex shrink-0 items-center justify-center size-4 text-icon-muted">
              <ChevronDownIcon />
            </span>
          </SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>Installation</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>Project Structure</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center cursor-pointer">
            <span className="flex-1">Building Your Application</span>
            <span className="flex shrink-0 items-center justify-center size-4 text-icon-muted">
              <ChevronRightIcon />
            </span>
          </SidebarGroupLabel>
          {/* Collapsed — menu hidden */}
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center cursor-pointer">
            <span className="flex-1">API Reference</span>
            <span className="flex shrink-0 items-center justify-center size-4 text-icon-muted">
              <ChevronRightIcon />
            </span>
          </SidebarGroupLabel>
          {/* Collapsed — menu hidden */}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ),
}

/* ─── With Submenus Expanded ────────────────────────── */

export const WithSubmenusExpanded: Story = {
  render: (args: SidebarProps) => (
    <Sidebar {...args}>
      <SidebarHeader>
        <SidebarBrand
          icon={<GalleryVerticalEndIcon />}
          title="Documentation"
          description="V1.0.0"
          trailing={<ChevronsUpDownIcon />}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<PlaygroundIcon />}>
                <span className="flex-1">Playground</span>
                <span className="flex shrink-0 items-center justify-center size-4 text-icon-muted"><ChevronDownIcon /></span>
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>History</SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton active>Starred</SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>Settings</SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<ModelsIcon />}>
                <span className="flex-1">Models</span>
                <span className="flex shrink-0 items-center justify-center size-4 text-icon-muted"><ChevronDownIcon /></span>
              </SidebarMenuButton>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>Genesis</SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>Explorer</SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton>Quantum</SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<BookOpenIcon />}>
                <span className="flex-1">Documentation</span>
                <span className="flex shrink-0 items-center justify-center size-4 text-icon-muted"><ChevronRightIcon /></span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<SettingsIcon />}>
                <span className="flex-1">Settings</span>
                <span className="flex shrink-0 items-center justify-center size-4 text-icon-muted"><ChevronRightIcon /></span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarUserFooter />
    </Sidebar>
  ),
}

/* ─── With Menu Actions (hover to reveal "...") ─────── */

export const WithMenuActions: Story = {
  render: (args: SidebarProps) => (
    <Sidebar {...args}>
      <SidebarHeader>
        <SidebarBrand
          icon={<GalleryVerticalEndIcon />}
          title="Documentation"
          description="V1.0.0"
          trailing={<ChevronsUpDownIcon />}
        />
      </SidebarHeader>
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
      <SidebarUserFooter />
    </Sidebar>
  ),
}

/* ─── With Group Actions ("+" next to group labels) ── */

export const WithGroupActions: Story = {
  render: (args: SidebarProps) => (
    <Sidebar {...args}>
      <SidebarHeader>
        <SidebarBrand
          icon={<GalleryVerticalEndIcon />}
          title="Documentation"
          description="V1.0.0"
          trailing={<ChevronsUpDownIcon />}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupAction aria-label="Add platform item">
            <PlusIcon />
          </SidebarGroupAction>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<PlaygroundIcon />}>
                Playground
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<ModelsIcon />}>
                Models
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<BookOpenIcon />}>
                Documentation
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupAction aria-label="Add project">
            <PlusIcon />
          </SidebarGroupAction>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<FolderIcon />}>
                Design Engineering
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<FolderIcon />}>
                Sales &amp; Marketing
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarUserFooter />
    </Sidebar>
  ),
}

/* ─── Collapsed Sidebar ────────────────────────────── */

export const CollapsedSidebar: Story = {
  render: () => (
    <Sidebar collapsed>
      <SidebarHeader>
        <SidebarBrand
          icon={<GalleryVerticalEndIcon />}
          title="Documentation"
          description="V1.0.0"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<HomeIcon />}>Dashboard</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<InboxIcon />} active>Inbox</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<SettingsIcon />}>Settings</SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<PlaygroundIcon />}>Playground</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  ),
}
