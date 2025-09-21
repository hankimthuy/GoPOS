import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../button'

describe('Button Component', () => {
  // Test: Kiểm tra render với default props
  // Mục đích: Đảm bảo Button component render đúng với styling mặc định
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    
    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-primary', 'text-primary-foreground', 'hover:bg-primary/90')
  })

  // Test: Kiểm tra render với các variants khác nhau
  // Mục đích: Đảm bảo Button component hỗ trợ đúng các variant styles
  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="destructive">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-destructive', 'text-destructive-foreground', 'hover:bg-destructive/90')

    rerender(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toHaveClass('border', 'border-input', 'bg-background', 'hover:bg-accent', 'hover:text-accent-foreground')

    rerender(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-secondary', 'text-secondary-foreground', 'hover:bg-secondary/80')

    rerender(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByRole('button')).toHaveClass('hover:bg-accent', 'hover:text-accent-foreground')

    rerender(<Button variant="link">Link</Button>)
    expect(screen.getByRole('button')).toHaveClass('text-primary', 'underline-offset-4', 'hover:underline')
  })

  // Test: Kiểm tra render với các sizes khác nhau
  // Mục đích: Đảm bảo Button component hỗ trợ đúng các size options
  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-9', 'rounded-md', 'px-3')

    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-11', 'rounded-md', 'px-8')

    rerender(<Button size="icon">Icon</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-10', 'w-10')
  })

  // Test: Kiểm tra xử lý click events
  // Mục đích: Đảm bảo onClick callback được gọi đúng khi user click button
  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  // Test: Kiểm tra button có thể bị disable
  // Mục đích: Đảm bảo disabled state hoạt động đúng với styling phù hợp
  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50')
  })

  // Test: Kiểm tra render như child component khi asChild là true
  // Mục đích: Đảm bảo Button có thể render như một element khác (như link)
  it('renders as child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    
    const link = screen.getByRole('link', { name: 'Link Button' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
  })

  // Test: Kiểm tra áp dụng custom className
  // Mục đích: Đảm bảo custom styling có thể được thêm vào Button component
  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  // Test: Kiểm tra forward ref đúng cách
  // Mục đích: Đảm bảo ref được forward đến DOM element đúng
  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Button ref={ref}>Ref Button</Button>)
    
    expect(ref).toHaveBeenCalled()
  })

  // Test: Kiểm tra áp dụng base classes đúng
  // Mục đích: Đảm bảo Button có đầy đủ base styling classes
  it('applies correct base classes', () => {
    render(<Button>Base</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass(
      'inline-flex',
      'items-center',
      'justify-center',
      'whitespace-nowrap',
      'rounded-md',
      'text-sm',
      'font-medium',
      'ring-offset-background',
      'transition-colors',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2'
    )
  })

  // Test: Kiểm tra xử lý keyboard events
  // Mục đích: Đảm bảo onKeyDown callback hoạt động đúng khi user nhấn phím
  it('handles keyboard events', () => {
    const handleKeyDown = jest.fn()
    render(<Button onKeyDown={handleKeyDown}>Keyboard</Button>)
    
    const button = screen.getByRole('button')
    fireEvent.keyDown(button, { key: 'Enter' })
    
    expect(handleKeyDown).toHaveBeenCalledTimes(1)
  })

  // Test: Kiểm tra render với custom props
  // Mục đích: Đảm bảo các props khác được forward đúng đến DOM element
  it('renders with custom props', () => {
    render(<Button data-testid="custom-button" aria-label="Custom button">Custom</Button>)
    
    const button = screen.getByTestId('custom-button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label', 'Custom button')
  })

  // Test: Kiểm tra kết hợp variant và size classes đúng cách
  // Mục đích: Đảm bảo variant và size classes không conflict và hoạt động cùng nhau
  it('combines variant and size classes correctly', () => {
    render(<Button variant="outline" size="lg">Combined</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('border', 'border-input', 'bg-background', 'h-11', 'rounded-md', 'px-8')
  })
})