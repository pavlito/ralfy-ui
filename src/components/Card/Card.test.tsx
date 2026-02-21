import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './index'

describe('Card', () => {
  it('renders with children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders default variant', () => {
    render(<Card data-testid="card">Default</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('bg-card')
    expect(card).toHaveClass('text-card-foreground')
    expect(card).toHaveClass('rounded-lg')
    expect(card).toHaveClass('border')
    expect(card).toHaveClass('border-border')
  })

  it('renders outlined variant', () => {
    render(
      <Card variant="outlined" data-testid="card">
        Outlined
      </Card>,
    )
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('bg-transparent')
    expect(card).toHaveClass('border-2')
    expect(card).toHaveClass('border-border')
  })

  it('renders elevated variant', () => {
    render(
      <Card variant="elevated" data-testid="card">
        Elevated
      </Card>,
    )
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('bg-card')
    expect(card).toHaveClass('shadow-lg')
    expect(card).toHaveClass('border')
  })

  it('forwards ref', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Card ref={ref}>With ref</Card>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('supports className override', () => {
    render(
      <Card className="custom-class" data-testid="card">
        Custom
      </Card>,
    )
    expect(screen.getByTestId('card')).toHaveClass('custom-class')
  })
})

describe('CardHeader', () => {
  it('renders with children', () => {
    render(<CardHeader>Header content</CardHeader>)
    expect(screen.getByText('Header content')).toBeInTheDocument()
  })

  it('applies correct classes', () => {
    render(<CardHeader data-testid="header">Header</CardHeader>)
    const header = screen.getByTestId('header')
    expect(header).toHaveClass('flex')
    expect(header).toHaveClass('flex-col')
    expect(header).toHaveClass('gap-1.5')
    expect(header).toHaveClass('p-6')
  })

  it('supports className override', () => {
    render(
      <CardHeader className="extra" data-testid="header">
        Header
      </CardHeader>,
    )
    expect(screen.getByTestId('header')).toHaveClass('extra')
  })
})

describe('CardTitle', () => {
  it('renders as h3', () => {
    render(<CardTitle>Title</CardTitle>)
    const title = screen.getByText('Title')
    expect(title.tagName).toBe('H3')
  })

  it('applies correct classes', () => {
    render(<CardTitle>Title</CardTitle>)
    const title = screen.getByText('Title')
    expect(title).toHaveClass('text-lg')
    expect(title).toHaveClass('font-semibold')
    expect(title).toHaveClass('leading-tight')
    expect(title).toHaveClass('tracking-tight')
  })

  it('supports className override', () => {
    render(<CardTitle className="extra">Title</CardTitle>)
    expect(screen.getByText('Title')).toHaveClass('extra')
  })
})

describe('CardDescription', () => {
  it('renders with children', () => {
    render(<CardDescription>Description text</CardDescription>)
    expect(screen.getByText('Description text')).toBeInTheDocument()
  })

  it('renders as p element', () => {
    render(<CardDescription>Desc</CardDescription>)
    expect(screen.getByText('Desc').tagName).toBe('P')
  })

  it('applies correct classes', () => {
    render(<CardDescription>Desc</CardDescription>)
    const desc = screen.getByText('Desc')
    expect(desc).toHaveClass('text-sm')
    expect(desc).toHaveClass('text-muted-foreground')
  })

  it('supports className override', () => {
    render(<CardDescription className="extra">Desc</CardDescription>)
    expect(screen.getByText('Desc')).toHaveClass('extra')
  })
})

describe('CardContent', () => {
  it('renders with children', () => {
    render(<CardContent>Body content</CardContent>)
    expect(screen.getByText('Body content')).toBeInTheDocument()
  })

  it('applies correct classes', () => {
    render(<CardContent data-testid="content">Content</CardContent>)
    const content = screen.getByTestId('content')
    expect(content).toHaveClass('p-6')
    expect(content).toHaveClass('pt-0')
  })

  it('supports className override', () => {
    render(
      <CardContent className="extra" data-testid="content">
        Content
      </CardContent>,
    )
    expect(screen.getByTestId('content')).toHaveClass('extra')
  })
})

describe('CardFooter', () => {
  it('renders with children', () => {
    render(<CardFooter>Footer content</CardFooter>)
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('applies correct classes', () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>)
    const footer = screen.getByTestId('footer')
    expect(footer).toHaveClass('flex')
    expect(footer).toHaveClass('items-center')
    expect(footer).toHaveClass('p-6')
    expect(footer).toHaveClass('pt-0')
  })

  it('supports className override', () => {
    render(
      <CardFooter className="extra" data-testid="footer">
        Footer
      </CardFooter>,
    )
    expect(screen.getByTestId('footer')).toHaveClass('extra')
  })
})

describe('Card compound composition', () => {
  it('renders full compound composition', () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>My Title</CardTitle>
          <CardDescription>My Description</CardDescription>
        </CardHeader>
        <CardContent>My Content</CardContent>
        <CardFooter>My Footer</CardFooter>
      </Card>,
    )

    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.getByText('My Title')).toBeInTheDocument()
    expect(screen.getByText('My Title').tagName).toBe('H3')
    expect(screen.getByText('My Description')).toBeInTheDocument()
    expect(screen.getByText('My Content')).toBeInTheDocument()
    expect(screen.getByText('My Footer')).toBeInTheDocument()
  })
})
