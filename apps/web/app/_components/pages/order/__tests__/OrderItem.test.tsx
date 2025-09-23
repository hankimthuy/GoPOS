import { render, screen, fireEvent } from '@testing-library/react'
import OrderItem from '../OrderItem'

// Mock data cho order item với đầy đủ properties
const mockOrderItem = {
  id: '1',
  menu_item_id: '1',
  quantity: 2,
  unit_price: 25000,
  total_price: 50000,
  special_instructions: 'Size M, Đá ít',
  created_at: '2023-01-01T00:00:00Z',
  menu_item: {
    id: '1',
    name: 'Cà phê đen',
    description: 'Cà phê đen truyền thống',
    base_price: 25000,
    price: 25000,
    category_id: '1',
    stock_quantity: 10,
    image_url: 'https://example.com/coffee.jpg',
    is_available: true,
    is_hot_option_available: false,
    sort_order: 1,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  },
}

// Mock data cho order item không có hình ảnh
const mockOrderItemWithoutImage = {
  ...mockOrderItem,
  menu_item: {
    ...mockOrderItem.menu_item,
    image_url: undefined,
  },
}

// Mock data cho order item không có description
const mockOrderItemWithoutDescription = {
  ...mockOrderItem,
  menu_item: {
    ...mockOrderItem.menu_item,
    description: undefined,
  },
  special_instructions: undefined,
}

describe('OrderItem Component', () => {
  const mockProps = {
    item: mockOrderItem,
    menuItem: mockOrderItem.menu_item,
    onQuantityChange: jest.fn(),
    onRemove: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Test: Kiểm tra hiển thị thông tin order item
  // Mục đích: Đảm bảo tên món, ghi chú, số lượng và giá hiển thị đúng
  it('renders order item information correctly', () => {
    render(<OrderItem {...mockProps} />)
    
    expect(screen.getByText('Cà phê đen')).toBeInTheDocument()
    expect(screen.getByText('Size M, Đá ít')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('50.000₫')).toBeInTheDocument()
  })

  // Test: Kiểm tra hiển thị hình ảnh khi có image_url
  // Mục đích: Đảm bảo component render đúng khi có hình ảnh
  it('renders image when menu item has image_url', () => {
    render(<OrderItem {...mockProps} />)
    
    expect(screen.getByText('Cà phê đen')).toBeInTheDocument()
  })

  // Test: Kiểm tra hiển thị không có hình ảnh
  // Mục đích: Đảm bảo component render đúng khi không có hình ảnh
  it('renders without image when menu item has no image_url', () => {
    const propsWithoutImage = {
      item: mockOrderItemWithoutImage,
      menuItem: mockOrderItemWithoutImage.menu_item,
      onQuantityChange: jest.fn(),
      onRemove: jest.fn(),
    }
    
    render(<OrderItem {...propsWithoutImage} />)
    
    expect(screen.getByText('Cà phê đen')).toBeInTheDocument()
  })

  // Test: Kiểm tra hiển thị special instructions
  // Mục đích: Đảm bảo special instructions hiển thị khi có
  it('shows special instructions when available', () => {
    render(<OrderItem {...mockProps} />)
    
    expect(screen.getByText('Size M, Đá ít')).toBeInTheDocument()
  })

  // Test: Kiểm tra hiển thị description khi không có special instructions
  // Mục đích: Đảm bảo fallback về description khi không có special instructions
  it('shows menu item description when no special instructions', () => {
    const propsWithoutSpecialInstructions = {
      item: mockOrderItemWithoutDescription,
      menuItem: mockOrderItemWithoutDescription.menu_item,
      onQuantityChange: jest.fn(),
      onRemove: jest.fn(),
    }
    
    render(<OrderItem {...propsWithoutSpecialInstructions} />)
    
    expect(screen.getByText('Cà phê đen')).toBeInTheDocument()
  })

  // Test: Kiểm tra hiển thị 'Unknown Item' khi menu item null
  // Mục đích: Đảm bảo error handling khi menu item data bị thiếu
  it('shows "Unknown Item" when menu item is null', () => {
    const itemWithNullMenuItem = {
      ...mockOrderItem,
      menu_item: null as any,
    }
    
    const propsWithNullMenuItem = {
      item: itemWithNullMenuItem,
      menuItem: undefined,
      onQuantityChange: jest.fn(),
      onRemove: jest.fn(),
    }
    
    render(<OrderItem {...propsWithNullMenuItem} />)
    
    expect(screen.getByText('Unknown Item')).toBeInTheDocument()
  })

  // Test: Kiểm tra callback khi click nút xóa
  // Mục đích: Đảm bảo onRemove được gọi với đúng ID
  it('calls onRemove when remove button is clicked', () => {
    render(<OrderItem {...mockProps} />)
    
    const removeButton = screen.getByTestId('trash-icon').closest('button')
    fireEvent.click(removeButton!)
    
    expect(mockProps.onRemove).toHaveBeenCalledWith('1')
  })

  // Test: Kiểm tra format giá đúng cách
  // Mục đích: Đảm bảo giá được format đúng theo định dạng tiền tệ
  it('formats price correctly using formatPrice utility', () => {
    render(<OrderItem {...mockProps} />)
    
    expect(screen.getByText('50.000₫')).toBeInTheDocument()
  })

  // Test: Kiểm tra CSS classes cho layout
  // Mục đích: Đảm bảo layout CSS classes được áp dụng đúng
  it('applies correct CSS classes for layout', () => {
    render(<OrderItem {...mockProps} />)
    
    const container = screen.getByText('Cà phê đen').closest('.w-full')
    expect(container).toHaveClass('w-full', 'flex', 'items-center', 'gap-3', 'py-2')
  })

  // Test: Kiểm tra CSS classes cho quantity display
  // Mục đích: Đảm bảo quantity display có styling đúng
  it('applies correct CSS classes for quantity display', () => {
    render(<OrderItem {...mockProps} />)
    
    const quantityCard = screen.getByText('2').closest('div')
    expect(quantityCard).toHaveClass('w-8', 'h-8', 'bg-[#ea7b69]', 'rounded-lg', 'flex', 'items-center', 'justify-center')
  })

  // Test: Kiểm tra CSS classes cho price display
  // Mục đích: Đảm bảo price display có styling đúng
  it('applies correct CSS classes for price display', () => {
    render(<OrderItem {...mockProps} />)
    
    const priceElement = screen.getByText('50.000₫')
    expect(priceElement).toHaveClass('w-16', 'font-medium', 'text-[#ea7b69]', 'text-sm', 'text-right', 'flex-shrink-0')
  })

  // Test: Kiểm tra CSS classes cho remove button
  // Mục đích: Đảm bảo remove button có styling và hover effects đúng
  it('applies correct CSS classes for remove button', () => {
    render(<OrderItem {...mockProps} />)
    
    const removeButton = screen.getByTestId('trash-icon').closest('button')
    expect(removeButton).toHaveClass('w-6', 'h-6', 'opacity-60', 'hover:opacity-100', 'p-0', 'flex-shrink-0')
  })

  // Test: Kiểm tra hiển thị quantity đúng
  // Mục đích: Đảm bảo quantity được hiển thị chính xác
  it('displays correct quantity', () => {
    render(<OrderItem {...mockProps} />)
    
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  // Test: Kiểm tra xử lý các quantity khác nhau
  // Mục đích: Đảm bảo component hiển thị đúng với các quantity values khác nhau
  it('handles different quantities correctly', () => {
    const itemWithDifferentQuantity = {
      ...mockOrderItem,
      quantity: 5,
    }
    
    const propsWithDifferentQuantity = {
      item: itemWithDifferentQuantity,
      menuItem: itemWithDifferentQuantity.menu_item,
      onQuantityChange: jest.fn(),
      onRemove: jest.fn(),
    }
    
    render(<OrderItem {...propsWithDifferentQuantity} />)
    
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  // Test: Kiểm tra text truncation classes
  // Mục đích: Đảm bảo text được truncate đúng cách để tránh overflow
  it('maintains proper text truncation classes', () => {
    render(<OrderItem {...mockProps} />)
    
    const nameElement = screen.getByText('Cà phê đen')
    expect(nameElement).toHaveClass('truncate')
    
    const descriptionElement = screen.getByText('Size M, Đá ít')
    expect(descriptionElement).toHaveClass('truncate')
  })
})
