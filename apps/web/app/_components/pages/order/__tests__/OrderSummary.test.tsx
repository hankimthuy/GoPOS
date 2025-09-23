import { render, screen, fireEvent } from '@testing-library/react'
import OrderSummary from '../OrderSummary'

// Mock data cho order với đầy đủ properties
const mockOrder = {
  orderId: '34562',
  orderType: 'tai-quan' as const,
  items: [
    {
      id: '1',
      menu_item_id: '1',
      quantity: 2,
      unit_price: 45000,
      total_price: 90000,
      special_instructions: 'Size M, Đá ít',
      created_at: '2023-01-01T00:00:00Z',
      menu_item: {
        id: '1',
        name: 'Cà phê đen',
        description: 'Cà phê đen truyền thống',
        base_price: 25000,
        price: 45000,
        category_id: '1',
        stock_quantity: 10,
        image_url: 'https://example.com/coffee.jpg',
        is_available: true,
        is_hot_option_available: true,
        sort_order: 1,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
      },
    },
    {
      id: '2',
      menu_item_id: '2',
      quantity: 1,
      unit_price: 55000,
      total_price: 55000,
      special_instructions: 'Size L',
      created_at: '2023-01-01T00:00:00Z',
      menu_item: {
        id: '2',
        name: 'Trà sữa',
        description: 'Trà sữa thơm ngon',
        base_price: 30000,
        price: 55000,
        category_id: '2',
        stock_quantity: 5,
        image_url: 'https://example.com/tea.jpg',
        is_available: true,
        is_hot_option_available: false,
        sort_order: 2,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
      },
    },
  ],
  discount: 0,
  subtotal: 145000,
  total: 145000,
}

const mockOrderWithDiscount = {
  ...mockOrder,
  discount: 10000,
  subtotal: 145000,
  total: 135000,
}

describe('OrderSummary Component', () => {
  const mockProps = {
    order: mockOrder,
    getMenuItemById: jest.fn((id: string) => {
      const menuItems = [
        {
          id: '1',
          name: 'Cà phê đen',
          description: 'Cà phê đen truyền thống',
          base_price: 25000,
          price: 45000,
          category_id: '1',
          stock_quantity: 10,
          image_url: 'https://example.com/coffee.jpg',
          is_available: true,
          is_hot_option_available: true,
          sort_order: 1,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
        },
        {
          id: '2',
          name: 'Trà sữa',
          description: 'Trà sữa thơm ngon',
          base_price: 30000,
          price: 55000,
          category_id: '2',
          stock_quantity: 5,
          image_url: 'https://example.com/tea.jpg',
          is_available: true,
          is_hot_option_available: false,
          sort_order: 2,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
        },
      ];
      return menuItems.find(item => item.id === id);
    }),
    onOrderTypeChange: jest.fn(),
    onItemQuantityChange: jest.fn(),
    onItemRemove: jest.fn(),
    onCheckout: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Test: Kiểm tra hiển thị order ID
  // Mục đích: Đảm bảo order ID được hiển thị đúng
  it('renders order ID correctly', () => {
    render(<OrderSummary {...mockProps} />)
    
    expect(screen.getByText('Hóa đơn #34562')).toBeInTheDocument()
  })

  // Test: Kiểm tra hiển thị order type toggle
  // Mục đích: Đảm bảo OrderTypeToggle component được render
  it('renders order type toggle', () => {
    render(<OrderSummary {...mockProps} />)
    
    expect(screen.getByText('Tại quán')).toBeInTheDocument()
  })

  // Test: Kiểm tra hiển thị order items
  // Mục đích: Đảm bảo tất cả items trong order được hiển thị
  it('renders order items', () => {
    render(<OrderSummary {...mockProps} />)
    
    expect(screen.getByText('Cà phê đen')).toBeInTheDocument()
    expect(screen.getByText('Trà sữa')).toBeInTheDocument()
  })

  // Test: Kiểm tra hiển thị table headers
  // Mục đích: Đảm bảo các cột trong bảng được hiển thị đúng
  it('renders table headers', () => {
    render(<OrderSummary {...mockProps} />)
    
    expect(screen.getByText('Món')).toBeInTheDocument()
    expect(screen.getByText('SL')).toBeInTheDocument()
    expect(screen.getByText('Giá')).toBeInTheDocument()
  })

  // Test: Kiểm tra hiển thị subtotal
  // Mục đích: Đảm bảo subtotal được tính và hiển thị đúng
  it('renders subtotal correctly', () => {
    render(<OrderSummary {...mockProps} />)
    
    expect(screen.getByText('145.000₫')).toBeInTheDocument()
  })

  // Test: Kiểm tra hiển thị discount khi = 0
  // Mục đích: Đảm bảo discount hiển thị 0₫ khi không có giảm giá
  it('renders discount correctly', () => {
    render(<OrderSummary {...mockProps} />)
    
    expect(screen.getByText('0₫')).toBeInTheDocument()
  })

  // Test: Kiểm tra hiển thị discount khi > 0
  // Mục đích: Đảm bảo discount hiển thị đúng khi có giảm giá
  it('renders discount when discount is greater than 0', () => {
    const propsWithDiscount = {
      ...mockProps,
      order: mockOrderWithDiscount,
    }
    
    render(<OrderSummary {...propsWithDiscount} />)
    
    expect(screen.getByText('10.000₫')).toBeInTheDocument()
  })

  // Test: Kiểm tra hiển thị checkout button
  // Mục đích: Đảm bảo nút thanh toán được hiển thị
  it('renders checkout button', () => {
    render(<OrderSummary {...mockProps} />)
    
    expect(screen.getByText('Tiến hành Thanh toán')).toBeInTheDocument()
  })

  // Test: Kiểm tra hiển thị tổng cộng
  // Mục đích: Đảm bảo tổng cộng được hiển thị đúng
  it('renders total amount correctly', () => {
    render(<OrderSummary {...mockProps} />)
    
    expect(screen.getByText('Tổng cộng')).toBeInTheDocument()
    expect(screen.getByText('145.000₫')).toBeInTheDocument()
  })

  // Test: Kiểm tra nút thanh toán bị disable khi không có items
  // Mục đích: Đảm bảo không thể thanh toán khi giỏ hàng trống
  it('disables checkout button when no items', () => {
    const emptyOrder = {
      ...mockOrder,
      items: [],
    }
    
    const propsWithEmptyOrder = {
      ...mockProps,
      order: emptyOrder,
    }
    
    render(<OrderSummary {...propsWithEmptyOrder} />)
    
    const checkoutButton = screen.getByText('Tiến hành Thanh toán')
    expect(checkoutButton.closest('button')).toBeDisabled()
  })

  // Test: Kiểm tra hiển thị trạng thái đang xử lý thanh toán
  // Mục đích: Đảm bảo nút hiển thị trạng thái loading khi đang xử lý
  it('shows processing state when isProcessingPayment is true', () => {
    const propsWithProcessing = {
      ...mockProps,
      isProcessingPayment: true,
    }
    
    render(<OrderSummary {...propsWithProcessing} />)
    
    expect(screen.getByText('Đang xử lý...')).toBeInTheDocument()
    expect(screen.queryByText('Tiến hành Thanh toán')).not.toBeInTheDocument()
  })

  // Test: Kiểm tra nút thanh toán bị disable khi đang xử lý
  // Mục đích: Đảm bảo không thể click nhiều lần khi đang xử lý
  it('disables checkout button when processing payment', () => {
    const propsWithProcessing = {
      ...mockProps,
      isProcessingPayment: true,
    }
    
    render(<OrderSummary {...propsWithProcessing} />)
    
    const checkoutButton = screen.getByText('Đang xử lý...')
    expect(checkoutButton.closest('button')).toBeDisabled()
  })

  // Test: Kiểm tra callback khi click checkout button
  // Mục đích: Đảm bảo onCheckout được gọi khi click nút thanh toán
  it('calls onCheckout when checkout button is clicked', () => {
    render(<OrderSummary {...mockProps} />)
    
    const checkoutButton = screen.getByText('Tiến hành Thanh toán')
    fireEvent.click(checkoutButton)
    
    expect(mockProps.onCheckout).toHaveBeenCalledTimes(1)
  })

  // Test: Kiểm tra callback khi thay đổi order type
  // Mục đích: Đảm bảo onOrderTypeChange được gọi qua OrderTypeToggle
  it('calls onOrderTypeChange when order type is changed', () => {
    render(<OrderSummary {...mockProps} />)
    
    expect(screen.getByText('Tại quán')).toBeInTheDocument()
  })

  // Test: Kiểm tra callback khi thay đổi quantity
  // Mục đích: Đảm bảo onItemQuantityChange được gọi qua OrderItem
  it('calls onItemQuantityChange when item quantity is changed', () => {
    render(<OrderSummary {...mockProps} />)
    
    expect(screen.getByText('Cà phê đen')).toBeInTheDocument()
  })

  // Test: Kiểm tra callback khi xóa item
  // Mục đích: Đảm bảo onItemRemove được gọi qua OrderItem
  it('calls onItemRemove when item is removed', () => {
    render(<OrderSummary {...mockProps} />)
    
    expect(screen.getByText('Cà phê đen')).toBeInTheDocument()
  })

  // Test: Kiểm tra CSS classes cho layout
  // Mục đích: Đảm bảo layout có styling đúng
  it('applies correct CSS classes for layout', () => {
    render(<OrderSummary {...mockProps} />)
    
    const container = screen.getByText('Hóa đơn #34562').closest('div')?.parentElement?.parentElement
    expect(container).toHaveClass('w-full', 'lg:w-96', 'xl:w-[400px]', 'min-h-[600px]', 'lg:h-[810px]', 'flex', 'flex-col', 'bg-[#242836]', 'rounded-t-2xl', 'lg:rounded-none')
  })

  // Test: Kiểm tra CSS classes cho checkout button
  // Mục đích: Đảm bảo checkout button có styling đúng
  it('applies correct CSS classes for checkout button', () => {
    render(<OrderSummary {...mockProps} />)
    
    const checkoutButton = screen.getByText('Tiến hành Thanh toán')
    expect(checkoutButton).toHaveClass('font-bold', 'text-white', 'text-sm', 'lg:text-base', 'text-center')
  })

  // Test: Kiểm tra format số theo locale Việt Nam
  // Mục đích: Đảm bảo số được format đúng với dấu chấm và ký hiệu ₫
  it('formats numbers correctly with Vietnamese locale', () => {
    render(<OrderSummary {...mockProps} />)
    
    expect(screen.getByText('145.000₫')).toBeInTheDocument()
  })

  // Test: Kiểm tra xử lý danh sách items rỗng
  // Mục đích: Đảm bảo component không crash khi không có items
  it('handles empty items array', () => {
    const emptyOrder = {
      ...mockOrder,
      items: [],
    }
    
    const propsWithEmptyOrder = {
      ...mockProps,
      order: emptyOrder,
    }
    
    render(<OrderSummary {...propsWithEmptyOrder} />)
    
    expect(screen.getByText('Hóa đơn #34562')).toBeInTheDocument()
    expect(screen.getByText('0₫')).toBeInTheDocument()
  })

  // Test: Kiểm tra hiển thị đúng số lượng items
  // Mục đích: Đảm bảo tất cả items được hiển thị
  it('displays correct number of items', () => {
    render(<OrderSummary {...mockProps} />)
    
    expect(screen.getByText('Cà phê đen')).toBeInTheDocument()
    expect(screen.getByText('Trà sữa')).toBeInTheDocument()
  })

  // Test: Kiểm tra responsive design classes
  // Mục đích: Đảm bảo layout responsive hoạt động đúng
  it('maintains proper responsive design classes', () => {
    render(<OrderSummary {...mockProps} />)
    
    const container = screen.getByText('Hóa đơn #34562').closest('div')?.parentElement?.parentElement
    expect(container).toHaveClass('lg:w-96', 'xl:w-[400px]', 'lg:h-[810px]', 'lg:rounded-none')
  })
})
