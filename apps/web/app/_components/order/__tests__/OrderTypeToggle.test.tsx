import { render, screen, fireEvent } from '@testing-library/react'
import OrderTypeToggle from '../OrderTypeToggle'

describe('OrderTypeToggle Component', () => {
  const mockProps = {
    value: 'tai-quan' as const,
    onChange: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Test: Kiểm tra render tất cả các tùy chọn loại đơn hàng
  // Mục đích: Đảm bảo tất cả 3 loại đơn hàng được hiển thị
  it('renders all order type options', () => {
    render(<OrderTypeToggle {...mockProps} />)
    
    expect(screen.getByText('Tại quán')).toBeInTheDocument()
    expect(screen.getByText('Mang đi')).toBeInTheDocument()
    expect(screen.getByText('Giao hàng')).toBeInTheDocument()
  })

  // Test: Kiểm tra render với giá trị ban đầu đúng
  // Mục đích: Đảm bảo button được chọn ban đầu có trạng thái active
  it('renders with correct initial value', () => {
    render(<OrderTypeToggle {...mockProps} />)
    
    const tạiQuánButton = screen.getByText('Tại quán').closest('button')
    expect(tạiQuánButton).toHaveAttribute('data-state', 'on')
  })

  // Test: Kiểm tra gọi onChange khi chọn tùy chọn khác
  // Mục đích: Đảm bảo callback function được gọi khi user thay đổi lựa chọn
  it('calls onChange when different option is selected', () => {
    render(<OrderTypeToggle {...mockProps} />)
    
    const mangĐiButton = screen.getByText('Mang đi')
    fireEvent.click(mangĐiButton)
    
    expect(mockProps.onChange).toHaveBeenCalledWith('mang-di')
  })

  // Test: Kiểm tra gọi onChange với giá trị đúng cho mỗi tùy chọn
  // Mục đích: Đảm bảo mỗi button gọi callback với đúng value
  it('calls onChange with correct value for each option', () => {
    render(<OrderTypeToggle {...mockProps} />)
    
    const giaoHàngButton = screen.getByText('Giao hàng')
    fireEvent.click(giaoHàngButton)
    
    expect(mockProps.onChange).toHaveBeenCalledWith('giao-hang')
  })

  // Test: Kiểm tra xử lý đúng cả 3 loại đơn hàng
  // Mục đích: Đảm bảo component hoạt động đúng với tất cả các order types
  it('handles all three order types correctly', () => {
    const { rerender } = render(<OrderTypeToggle {...mockProps} />)
    
    // Test tai-quan
    expect(screen.getByText('Tại quán').closest('button')).toHaveAttribute('data-state', 'on')
    
    // Test mang-di
    rerender(<OrderTypeToggle {...mockProps} value="mang-di" />)
    expect(screen.getByText('Mang đi').closest('button')).toHaveAttribute('data-state', 'on')
    
    // Test giao-hang
    rerender(<OrderTypeToggle {...mockProps} value="giao-hang" />)
    expect(screen.getByText('Giao hàng').closest('button')).toHaveAttribute('data-state', 'on')
  })

  // Test: Kiểm tra CSS classes cho container
  // Mục đích: Đảm bảo container có layout styling đúng
  it('applies correct CSS classes for container', () => {
    render(<OrderTypeToggle {...mockProps} />)
    
    const container = screen.getByRole('group')
    expect(container).toHaveClass('w-full', 'flex', 'flex-wrap', 'justify-start', 'gap-2')
  })

  // Test: Kiểm tra CSS classes cho button active (tại quán)
  // Mục đích: Đảm bảo button được chọn có styling đúng
  it('applies correct CSS classes for active tai-quan button', () => {
    render(<OrderTypeToggle {...mockProps} />)
    
    const tạiQuánButton = screen.getByText('Tại quán').closest('button')
    expect(tạiQuánButton).toHaveClass('w-20', 'sm:w-24', 'h-8', 'sm:h-10', 'bg-[#ea7b69]', 'rounded-full', 'data-[state=on]:bg-[#ea7b69]', 'data-[state=on]:text-white', 'hover:bg-[#ea7b69]', 'border-0')
  })

  // Test: Kiểm tra CSS classes cho buttons không active
  // Mục đích: Đảm bảo buttons không được chọn có styling đúng
  it('applies correct CSS classes for inactive buttons', () => {
    render(<OrderTypeToggle {...mockProps} />)
    
    const mangĐiButton = screen.getByText('Mang đi').closest('button')
    expect(mangĐiButton).toHaveClass('w-20', 'sm:w-24', 'h-8', 'sm:h-10', 'rounded-full', 'border', 'border-[#e4e7eb]', 'bg-transparent', 'data-[state=on]:bg-[#ea7b69]', 'data-[state=on]:text-white', 'hover:bg-[#ea7b69]', 'hover:text-white')
  })

  // Test: Kiểm tra responsive design classes
  // Mục đích: Đảm bảo buttons có responsive sizing đúng
  it('applies responsive design classes correctly', () => {
    render(<OrderTypeToggle {...mockProps} />)
    
    const buttons = screen.getAllByRole('radio')
    buttons.forEach(button => {
      expect(button).toHaveClass('w-20', 'sm:w-24', 'h-8', 'sm:h-10')
    })
  })

  // Test: Kiểm tra text styling
  // Mục đích: Đảm bảo text có styling đúng cho active và inactive states
  it('maintains proper text styling', () => {
    render(<OrderTypeToggle {...mockProps} />)
    
    const tạiQuánText = screen.getByText('Tại quán')
    expect(tạiQuánText).toHaveClass('font-medium', 'text-xs', 'sm:text-sm', 'text-center')
    
    const mangĐiText = screen.getByText('Mang đi')
    expect(mangĐiText).toHaveClass('font-medium', 'text-[#ea7b69]', 'text-xs', 'sm:text-sm', 'text-center')
  })

  // Test: Kiểm tra xử lý thay đổi giá trị đúng cách
  // Mục đích: Đảm bảo component cập nhật UI khi value prop thay đổi
  it('handles value changes correctly', () => {
    const { rerender } = render(<OrderTypeToggle {...mockProps} />)
    
    // Initially tai-quan should be active
    expect(screen.getByText('Tại quán').closest('button')).toHaveAttribute('data-state', 'on')
    
    // Change to mang-di
    rerender(<OrderTypeToggle {...mockProps} value="mang-di" />)
    expect(screen.getByText('Mang đi').closest('button')).toHaveAttribute('data-state', 'on')
    expect(screen.getByText('Tại quán').closest('button')).toHaveAttribute('data-state', 'off')
    
    // Change to giao-hang
    rerender(<OrderTypeToggle {...mockProps} value="giao-hang" />)
    expect(screen.getByText('Giao hàng').closest('button')).toHaveAttribute('data-state', 'on')
    expect(screen.getByText('Mang đi').closest('button')).toHaveAttribute('data-state', 'off')
  })

  // Test: Kiểm tra gọi onChange với type assertion đúng
  // Mục đích: Đảm bảo callback được gọi với đúng type và value
  it('calls onChange with correct type assertion', () => {
    render(<OrderTypeToggle {...mockProps} />)
    
    const mangĐiButton = screen.getByText('Mang đi')
    fireEvent.click(mangĐiButton)
    
    expect(mockProps.onChange).toHaveBeenCalledWith('mang-di')
    expect(typeof mockProps.onChange.mock.calls[0][0]).toBe('string')
  })
})
