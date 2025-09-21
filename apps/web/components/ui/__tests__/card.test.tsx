import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../card'

describe('Card Components', () => {
  describe('Card', () => {
    // Test: Kiểm tra render với default props
    // Mục đích: Đảm bảo Card component render đúng với styling mặc định
    it('renders with default props', () => {
      render(<Card>Card content</Card>)
      
      const card = screen.getByText('Card content')
      expect(card).toBeInTheDocument()
      expect(card).toHaveClass('rounded-lg', 'border', 'bg-card', 'text-card-foreground', 'shadow-sm')
    })

    // Test: Kiểm tra áp dụng custom className
    // Mục đích: Đảm bảo custom styling có thể được thêm vào Card component
    it('applies custom className', () => {
      render(<Card className="custom-class">Custom card</Card>)
      
      const card = screen.getByText('Custom card')
      expect(card).toHaveClass('custom-class')
    })

    // Test: Kiểm tra forward ref đúng cách
    // Mục đích: Đảm bảo ref được forward đến DOM element đúng
    it('forwards ref correctly', () => {
      const ref = jest.fn()
      render(<Card ref={ref}>Ref card</Card>)
      
      expect(ref).toHaveBeenCalled()
    })

    // Test: Kiểm tra forward additional props
    // Mục đích: Đảm bảo các props khác được forward đúng đến DOM element
    it('forwards additional props', () => {
      render(<Card data-testid="card" role="article">Test card</Card>)
      
      const card = screen.getByTestId('card')
      expect(card).toHaveAttribute('role', 'article')
    })
  })

  describe('CardHeader', () => {
    // Test: Kiểm tra render với default props
    // Mục đích: Đảm bảo CardHeader component render đúng với styling mặc định
    it('renders with default props', () => {
      render(<CardHeader>Header content</CardHeader>)
      
      const header = screen.getByText('Header content')
      expect(header).toBeInTheDocument()
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6')
    })

    // Test: Kiểm tra áp dụng custom className
    // Mục đích: Đảm bảo custom styling có thể được thêm vào CardHeader component
    it('applies custom className', () => {
      render(<CardHeader className="custom-header">Custom header</CardHeader>)
      
      const header = screen.getByText('Custom header')
      expect(header).toHaveClass('custom-header')
    })

    // Test: Kiểm tra forward ref đúng cách
    // Mục đích: Đảm bảo ref được forward đến DOM element đúng
    it('forwards ref correctly', () => {
      const ref = jest.fn()
      render(<CardHeader ref={ref}>Ref header</CardHeader>)
      
      expect(ref).toHaveBeenCalled()
    })
  })

  describe('CardTitle', () => {
    // Test: Kiểm tra render với default props
    // Mục đích: Đảm bảo CardTitle component render đúng với heading level và styling mặc định
    it('renders with default props', () => {
      render(<CardTitle>Card title</CardTitle>)
      
      const title = screen.getByRole('heading', { level: 3 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent('Card title')
      expect(title).toHaveClass('text-2xl', 'font-semibold', 'leading-none', 'tracking-tight')
    })

    // Test: Kiểm tra áp dụng custom className
    // Mục đích: Đảm bảo custom styling có thể được thêm vào CardTitle component
    it('applies custom className', () => {
      render(<CardTitle className="custom-title">Custom title</CardTitle>)
      
      const title = screen.getByRole('heading')
      expect(title).toHaveClass('custom-title')
    })

    // Test: Kiểm tra forward ref đúng cách
    // Mục đích: Đảm bảo ref được forward đến DOM element đúng
    it('forwards ref correctly', () => {
      const ref = jest.fn()
      render(<CardTitle ref={ref}>Ref title</CardTitle>)
      
      expect(ref).toHaveBeenCalled()
    })
  })

  describe('CardDescription', () => {
    // Test: Kiểm tra render với default props
    // Mục đích: Đảm bảo CardDescription component render đúng với styling mặc định
    it('renders with default props', () => {
      render(<CardDescription>Card description</CardDescription>)
      
      const description = screen.getByText('Card description')
      expect(description).toBeInTheDocument()
      expect(description).toHaveClass('text-sm', 'text-muted-foreground')
    })

    // Test: Kiểm tra áp dụng custom className
    // Mục đích: Đảm bảo custom styling có thể được thêm vào CardDescription component
    it('applies custom className', () => {
      render(<CardDescription className="custom-description">Custom description</CardDescription>)
      
      const description = screen.getByText('Custom description')
      expect(description).toHaveClass('custom-description')
    })

    // Test: Kiểm tra forward ref đúng cách
    // Mục đích: Đảm bảo ref được forward đến DOM element đúng
    it('forwards ref correctly', () => {
      const ref = jest.fn()
      render(<CardDescription ref={ref}>Ref description</CardDescription>)
      
      expect(ref).toHaveBeenCalled()
    })
  })

  describe('CardContent', () => {
    // Test: Kiểm tra render với default props
    // Mục đích: Đảm bảo CardContent component render đúng với styling mặc định
    it('renders with default props', () => {
      render(<CardContent>Card content</CardContent>)
      
      const content = screen.getByText('Card content')
      expect(content).toBeInTheDocument()
      expect(content).toHaveClass('p-6', 'pt-0')
    })

    // Test: Kiểm tra áp dụng custom className
    // Mục đích: Đảm bảo custom styling có thể được thêm vào CardContent component
    it('applies custom className', () => {
      render(<CardContent className="custom-content">Custom content</CardContent>)
      
      const content = screen.getByText('Custom content')
      expect(content).toHaveClass('custom-content')
    })

    // Test: Kiểm tra forward ref đúng cách
    // Mục đích: Đảm bảo ref được forward đến DOM element đúng
    it('forwards ref correctly', () => {
      const ref = jest.fn()
      render(<CardContent ref={ref}>Ref content</CardContent>)
      
      expect(ref).toHaveBeenCalled()
    })
  })

  describe('CardFooter', () => {
    // Test: Kiểm tra render với default props
    // Mục đích: Đảm bảo CardFooter component render đúng với styling mặc định
    it('renders with default props', () => {
      render(<CardFooter>Footer content</CardFooter>)
      
      const footer = screen.getByText('Footer content')
      expect(footer).toBeInTheDocument()
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0')
    })

    // Test: Kiểm tra áp dụng custom className
    // Mục đích: Đảm bảo custom styling có thể được thêm vào CardFooter component
    it('applies custom className', () => {
      render(<CardFooter className="custom-footer">Custom footer</CardFooter>)
      
      const footer = screen.getByText('Custom footer')
      expect(footer).toHaveClass('custom-footer')
    })

    // Test: Kiểm tra forward ref đúng cách
    // Mục đích: Đảm bảo ref được forward đến DOM element đúng
    it('forwards ref correctly', () => {
      const ref = jest.fn()
      render(<CardFooter ref={ref}>Ref footer</CardFooter>)
      
      expect(ref).toHaveBeenCalled()
    })
  })

  describe('Complete Card Structure', () => {
    // Test: Kiểm tra render card hoàn chỉnh với tất cả components
    // Mục đích: Đảm bảo tất cả card components hoạt động đúng khi kết hợp với nhau
    it('renders a complete card with all components', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Card</CardTitle>
            <CardDescription>This is a test card description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the card content</p>
          </CardContent>
          <CardFooter>
            <button>Action</button>
          </CardFooter>
        </Card>
      )
      
      expect(screen.getByRole('heading', { name: 'Test Card' })).toBeInTheDocument()
      expect(screen.getByText('This is a test card description')).toBeInTheDocument()
      expect(screen.getByText('This is the card content')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
    })

    // Test: Kiểm tra duy trì cấu trúc semantic đúng
    // Mục đích: Đảm bảo card có cấu trúc HTML semantic phù hợp cho accessibility
    it('maintains proper semantic structure', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Semantic Card</CardTitle>
            <CardDescription>Description</CardDescription>
          </CardHeader>
          <CardContent>Content</CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      )
      
      const card = screen.getByText('Semantic Card').closest('div')?.parentElement
      expect(card).toHaveClass('rounded-lg', 'border', 'bg-card', 'text-card-foreground', 'shadow-sm')
    })
  })
})