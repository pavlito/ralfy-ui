import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './index'

describe('Dialog', () => {
  it('renders when open', () => {
    render(
      <Dialog open>
        <DialogContent>
          <p>Dialog body</p>
        </DialogContent>
      </Dialog>,
    )

    expect(screen.getByText('Dialog body')).toBeInTheDocument()
  })

  it('shows title and description', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>My Title</DialogTitle>
            <DialogDescription>My Description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    )

    expect(screen.getByText('My Title')).toBeInTheDocument()
    expect(screen.getByText('My Description')).toBeInTheDocument()
  })

  it('close button exists and works', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()

    render(
      <Dialog open onOpenChange={onOpenChange}>
        <DialogContent>
          <p>Content</p>
        </DialogContent>
      </Dialog>,
    )

    const closeButton = screen.getByRole('button', { name: /close/i })
    expect(closeButton).toBeInTheDocument()

    await user.click(closeButton)
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('DialogHeader renders', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogHeader data-testid="dialog-header">
            <DialogTitle>Title</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    )

    expect(screen.getByTestId('dialog-header')).toBeInTheDocument()
  })

  it('DialogFooter renders', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogFooter data-testid="dialog-footer">
            <button>Cancel</button>
            <button>Confirm</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    )

    const footer = screen.getByTestId('dialog-footer')
    expect(footer).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })

  it('DialogTrigger opens dialog', async () => {
    const user = userEvent.setup()

    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <p>Opened content</p>
        </DialogContent>
      </Dialog>,
    )

    expect(screen.queryByText('Opened content')).not.toBeInTheDocument()

    await user.click(screen.getByText('Open'))

    expect(screen.getByText('Opened content')).toBeInTheDocument()
  })

  it('controlled open/onOpenChange works', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()

    const { rerender } = render(
      <Dialog open={false} onOpenChange={onOpenChange}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <p>Controlled content</p>
        </DialogContent>
      </Dialog>,
    )

    expect(screen.queryByText('Controlled content')).not.toBeInTheDocument()

    await user.click(screen.getByText('Open'))
    expect(onOpenChange).toHaveBeenCalledWith(true)

    rerender(
      <Dialog open={true} onOpenChange={onOpenChange}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <p>Controlled content</p>
        </DialogContent>
      </Dialog>,
    )

    expect(screen.getByText('Controlled content')).toBeInTheDocument()
  })

  it('content has correct role=dialog', () => {
    render(
      <Dialog open>
        <DialogContent>
          <p>Role test</p>
        </DialogContent>
      </Dialog>,
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('supports className override on DialogContent', () => {
    render(
      <Dialog open>
        <DialogContent className="custom-class">
          <p>Custom class test</p>
        </DialogContent>
      </Dialog>,
    )

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveClass('custom-class')
  })
})
