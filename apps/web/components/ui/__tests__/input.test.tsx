import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '../input'

describe('Input Component', () => {
  // Test: Kiểm tra render với default props
  // Mục đích: Đảm bảo input component render đúng với styling mặc định
  it('renders with default props', () => {
    render(<Input />)
    
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass(
      'flex',
      'h-10',
      'w-full',
      'rounded-md',
      'border',
      'border-input',
      'bg-background',
      'px-3',
      'py-2',
      'text-sm',
      'ring-offset-background',
      'file:border-0',
      'file:bg-transparent',
      'file:text-sm',
      'file:font-medium',
      'placeholder:text-muted-foreground',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed',
      'disabled:opacity-50'
    )
  })

  // Test: Kiểm tra render với placeholder
  // Mục đích: Đảm bảo placeholder text được hiển thị đúng
  it('renders with placeholder', () => {
    render(<Input placeholder="Enter text here" />)
    
    const input = screen.getByPlaceholderText('Enter text here')
    expect(input).toBeInTheDocument()
  })

  // Test: Kiểm tra render với các loại input khác nhau
  // Mục đích: Đảm bảo input component hỗ trợ đúng các input types
  it('renders with different input types', () => {
    const { rerender } = render(<Input type="text" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')

    rerender(<Input type="email" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')

    rerender(<Input type="password" />)
    expect(screen.getByDisplayValue('')).toHaveAttribute('type', 'password')

    rerender(<Input type="number" />)
    expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number')
  })

  // Test: Kiểm tra xử lý thay đổi giá trị
  // Mục đích: Đảm bảo onChange callback được gọi đúng khi user nhập liệu
  it('handles value changes', () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test input' } })
    
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(input).toHaveValue('test input')
  })

  // Test: Kiểm tra input có thể bị disable
  // Mục đích: Đảm bảo disabled state hoạt động đúng với styling phù hợp
  it('can be disabled', () => {
    render(<Input disabled />)
    
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
    expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
  })

  // Test: Kiểm tra input có thể được đánh dấu required
  // Mục đích: Đảm bảo required attribute hoạt động đúng
  it('can be required', () => {
    render(<Input required />)
    
    const input = screen.getByRole('textbox')
    expect(input).toBeRequired()
  })

  // Test: Kiểm tra áp dụng custom className
  // Mục đích: Đảm bảo custom styling có thể được thêm vào
  it('applies custom className', () => {
    render(<Input className="custom-input" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('custom-input')
  })

  // Test: Kiểm tra forward ref đúng cách
  // Mục đích: Đảm bảo ref được forward đến DOM element đúng
  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Input ref={ref} />)
    
    expect(ref).toHaveBeenCalled()
  })

  // Test: Kiểm tra forward additional props
  // Mục đích: Đảm bảo các props khác được forward đúng đến DOM element
  it('forwards additional props', () => {
    render(<Input data-testid="test-input" aria-label="Test input" />)
    
    const input = screen.getByTestId('test-input')
    expect(input).toHaveAttribute('aria-label', 'Test input')
  })

  // Test: Kiểm tra xử lý focus events
  // Mục đích: Đảm bảo onFocus và onBlur callbacks hoạt động đúng
  it('handles focus events', () => {
    const handleFocus = jest.fn()
    const handleBlur = jest.fn()
    
    render(<Input onFocus={handleFocus} onBlur={handleBlur} />)
    
    const input = screen.getByRole('textbox')
    
    fireEvent.focus(input)
    expect(handleFocus).toHaveBeenCalledTimes(1)
    
    fireEvent.blur(input)
    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  // Test: Kiểm tra xử lý keyboard events
  // Mục đích: Đảm bảo onKeyDown và onKeyUp callbacks hoạt động đúng
  it('handles keyboard events', () => {
    const handleKeyDown = jest.fn()
    const handleKeyUp = jest.fn()
    
    render(<Input onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />)
    
    const input = screen.getByRole('textbox')
    
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(handleKeyDown).toHaveBeenCalledTimes(1)
    
    fireEvent.keyUp(input, { key: 'Enter' })
    expect(handleKeyUp).toHaveBeenCalledTimes(1)
  })

  // Test: Kiểm tra hỗ trợ controlled input
  // Mục đích: Đảm bảo input hoạt động đúng với controlled mode
  it('supports controlled input', () => {
    const handleChange = jest.fn()
    const { rerender } = render(<Input value="initial value" onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('initial value')
    
    rerender(<Input value="updated value" onChange={handleChange} />)
    expect(input).toHaveValue('updated value')
  })

  // Test: Kiểm tra hỗ trợ uncontrolled input với defaultValue
  // Mục đích: Đảm bảo input hoạt động đúng với uncontrolled mode
  it('supports uncontrolled input with defaultValue', () => {
    render(<Input defaultValue="default value" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('default value')
  })

  // Test: Kiểm tra xử lý file input type
  // Mục đích: Đảm bảo input hỗ trợ file type đúng cách
  it('handles file input type', () => {
    render(<Input type="file" />)
    
    const input = screen.getByDisplayValue('')
    expect(input).toHaveAttribute('type', 'file')
  })

  // Test: Kiểm tra duy trì accessibility attributes
  // Mục đích: Đảm bảo input có đầy đủ accessibility attributes
  it('maintains proper accessibility attributes', () => {
    render(<Input aria-describedby="description" aria-invalid="true" />)
    
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-describedby', 'description')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })
})
