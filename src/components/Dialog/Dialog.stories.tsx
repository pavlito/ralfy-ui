import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './index'
import { Button } from '../Button'
import { Input } from '../Input'

const meta: Meta = {
  title: 'Components/Dialog',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px 0' }}>
          <Input label="Name" placeholder="Enter your name" />
          <Input label="Email" placeholder="you@example.com" type="email" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const Confirmation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Delete Feed</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Feed</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this feed? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            This will permanently delete your account and all data. Type "DELETE" to confirm.
          </DialogDescription>
        </DialogHeader>
        <div style={{ padding: '16px 0' }}>
          <Input label='Type "DELETE" to confirm' placeholder="DELETE" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Delete Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const Info: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Keyboard Shortcuts</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Quick reference for available keyboard shortcuts.
          </DialogDescription>
        </DialogHeader>
        <div style={{ padding: '16px 0', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>New post</span>
            <kbd style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '12px', border: '1px solid var(--border)' }}>Ctrl + N</kbd>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Search</span>
            <kbd style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '12px', border: '1px solid var(--border)' }}>Ctrl + K</kbd>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Toggle dark mode</span>
            <kbd style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '12px', border: '1px solid var(--border)' }}>Ctrl + D</kbd>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
