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

  it('renders all order type options', () => {
    render(<OrderTypeToggle {...mockProps} />)
    
    expect(screen.getByText('Tại quán')).toBeInTheDocument()
    expect(screen.getByText('Mang đi')).toBeInTheDocument()
    expect(screen.getByText('Giao hàng')).toBeInTheDocument()
  })

  it('renders with correct initial value', () => {
    render(<OrderTypeToggle {...mockProps} />)
    
    const tạiQuánButton = screen.getByText('Tại quán').closest('button')
    expect(tạiQuánButton).toHaveAttribute('data-state', 'on')
  })

  it('calls onChange when different option is selected', () => {
    render(<OrderTypeToggle {...mockProps} />)
    
    const mangĐiButton = screen.getByText('Mang đi')
    fireEvent.click(mangĐiButton)
    
    expect(mockProps.onChange).toHaveBeenCalledWith('mang-di')
  })

  it('calls onChange with correct value for each option', () => {
    render(<OrderTypeToggle {...mockProps} />)
    
    const giaoHàngButton = screen.getByText('Giao hàng')
    fireEvent.click(giaoHàngButton)
    
    expect(mockProps.onChange).toHaveBeenCalledWith('giao-hang')
  })

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

  it('applies correct CSS classes for container', () => {
    render(<OrderTypeToggle {...mockProps} />)
    
    const container = screen.getByRole('group')
    expect(container).toHaveClass('w-full', 'flex', 'flex-wrap', 'justify-start', 'gap-2')
  })

  it('applies correct CSS classes for active tai-quan button', () => {
    render(<OrderTypeToggle {...mockProps} />)
    
    const tạiQuánButton = screen.getByText('Tại quán').closest('button')
    expect(tạiQuánButton).toHaveClass('w-20', 'sm:w-24', 'h-8', 'sm:h-10', 'bg-[#ea7b69]', 'rounded-full', 'data-[state=on]:bg-[#ea7b69]', 'data-[state=on]:text-white', 'hover:bg-[#ea7b69]', 'border-0')
  })

  it('applies correct CSS classes for inactive buttons', () => {
    render(<OrderTypeToggle {...mockProps} />)
    
    const mangĐiButton = screen.getByText('Mang đi').closest('button')
    expect(mangĐiButton).toHaveClass('w-20', 'sm:w-24', 'h-8', 'sm:h-10', 'rounded-full', 'border', 'border-[#e4e7eb]', 'bg-transparent', 'data-[state=on]:bg-[#ea7b69]', 'data-[state=on]:text-white', 'hover:bg-[#ea7b69]', 'hover:text-white')
  })

  it('applies responsive design classes correctly', () => {
    render(<OrderTypeToggle {...mockProps} />)
    
    const buttons = screen.getAllByRole('radio')
    buttons.forEach(button => {
      expect(button).toHaveClass('w-20', 'sm:w-24', 'h-8', 'sm:h-10')
    })
  })

  it('maintains proper text styling', () => {
    render(<OrderTypeToggle {...mockProps} />)
    
    const tạiQuánText = screen.getByText('Tại quán')
    expect(tạiQuánText).toHaveClass('font-medium', 'text-xs', 'sm:text-sm', 'text-center')
    
    const mangĐiText = screen.getByText('Mang đi')
    expect(mangĐiText).toHaveClass('font-medium', 'text-[#ea7b69]', 'text-xs', 'sm:text-sm', 'text-center')
  })

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

  it('calls onChange with correct type assertion', () => {
    render(<OrderTypeToggle {...mockProps} />)
    
    const mangĐiButton = screen.getByText('Mang đi')
    fireEvent.click(mangĐiButton)
    
    expect(mockProps.onChange).toHaveBeenCalledWith('mang-di')
    expect(typeof mockProps.onChange.mock.calls[0][0]).toBe('string')
  })
})
