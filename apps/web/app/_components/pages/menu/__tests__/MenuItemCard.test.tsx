import { render, screen, fireEvent } from '@testing-library/react'
import MenuItemCard from '../MenuItemCard'

const mockMenuItem = {
  id: '1',
  name: 'Cà phê đen',
  description: 'Cà phê đen truyền thống',
  price: 25000,
  category_id: '1',
  stock_quantity: 10,
  image_url: 'https://example.com/coffee.jpg',
  is_available: true,
  sort_order: 1,
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z',
  category: {
    id: '1',
    name: 'Cà phê',
    description: 'Các loại cà phê',
    image_url: null,
    sort_order: 1,
    is_active: true,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  }
}

const mockMenuItemWithoutImage = {
  ...mockMenuItem,
  image_url: null,
}

const mockMenuItemWithoutDescription = {
  ...mockMenuItem,
  description: null,
}

const mockMenuItemOutOfStock = {
  ...mockMenuItem,
  stock_quantity: 0,
}

describe('MenuItemCard Component', () => {
  const mockProps = {
    item: mockMenuItem,
    onClick: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Test: Kiểm tra hiển thị thông tin menu item đúng cách
  // Mục đích: Đảm bảo tên, giá, số lượng và mô tả được hiển thị chính xác
  it('renders menu item information correctly', () => {
    render(<MenuItemCard {...mockProps} />)
    
    expect(screen.getByText('Cà phê đen')).toBeInTheDocument()
    expect(screen.getByText('$25000.00')).toBeInTheDocument()
    expect(screen.getByText('Còn 10 ly')).toBeInTheDocument()
    expect(screen.getByText('Cà phê đen truyền thống')).toBeInTheDocument()
  })

  // Test: Kiểm tra gọi onClick khi click vào card
  // Mục đích: Đảm bảo callback function được gọi khi user click vào menu item
  it('calls onClick when card is clicked', () => {
    render(<MenuItemCard {...mockProps} />)
    
    const card = screen.getByText('Cà phê đen').closest('[role="button"]') || screen.getByText('Cà phê đen').closest('div')
    fireEvent.click(card!)
    
    expect(mockProps.onClick).toHaveBeenCalledWith(mockMenuItem)
  })

  // Test: Kiểm tra render hình ảnh khi có image_url
  // Mục đích: Đảm bảo background image được hiển thị đúng khi có URL
  it('renders image when image_url is provided', () => {
    render(<MenuItemCard {...mockProps} />)
    
    const imageElement = screen.getByText('Cà phê đen').closest('div')?.parentElement?.querySelector('div[style*="background-image"]')
    expect(imageElement).toHaveStyle({
      backgroundImage: 'url(https://example.com/coffee.jpg)'
    })
  })

  // Test: Kiểm tra render icon khi không có hình ảnh
  // Mục đích: Đảm bảo icon được hiển thị khi không có image_url
  it('renders icon when image_url is null', () => {
    const propsWithoutImage = {
      item: mockMenuItemWithoutImage,
      onClick: jest.fn(),
    }
    
    render(<MenuItemCard {...propsWithoutImage} />)
    
    // Kiểm tra icon container có gradient background
    const iconContainer = screen.getByText('Cà phê đen').closest('div')?.parentElement?.querySelector('div[class*="bg-gradient-to-br"]')
    expect(iconContainer).toBeInTheDocument()
    expect(iconContainer).toHaveClass('from-[#ea7b69]', 'to-[#d65a4a]')
  })

  // Test: Kiểm tra không render description khi description là null
  // Mục đích: Đảm bảo description không hiển thị khi data bị thiếu
  it('does not render description when description is null', () => {
    const propsWithoutDescription = {
      item: mockMenuItemWithoutDescription,
      onClick: jest.fn(),
    }
    
    render(<MenuItemCard {...propsWithoutDescription} />)
    
    expect(screen.queryByText('Cà phê đen truyền thống')).not.toBeInTheDocument()
  })

  // Test: Kiểm tra hiển thị 'Có sẵn' khi stock_quantity là null
  // Mục đích: Đảm bảo fallback text khi stock data bị thiếu
  it('shows "Có sẵn" when stock_quantity is null', () => {
    const itemWithoutStock = {
      ...mockMenuItem,
      stock_quantity: null,
    }
    
    const propsWithoutStock = {
      item: itemWithoutStock,
      onClick: jest.fn(),
    }
    
    render(<MenuItemCard {...propsWithoutStock} />)
    
    expect(screen.getByText('Có sẵn')).toBeInTheDocument()
  })

  // Test: Kiểm tra hiển thị 'Có sẵn' khi stock_quantity là 0
  // Mục đích: Đảm bảo hiển thị đúng khi hết hàng
  it('shows "Có sẵn" when stock_quantity is 0', () => {
    const propsOutOfStock = {
      item: mockMenuItemOutOfStock,
      onClick: jest.fn(),
    }
    
    render(<MenuItemCard {...propsOutOfStock} />)
    
    expect(screen.getByText('Có sẵn')).toBeInTheDocument()
  })

  // Test: Kiểm tra CSS classes cho styling
  // Mục đích: Đảm bảo card có styling và hover effects đúng
  it('applies correct CSS classes for styling', () => {
    render(<MenuItemCard {...mockProps} />)
    
    const card = screen.getByText('Cà phê đen').closest('div')?.parentElement?.parentElement
    expect(card).toHaveClass('bg-[#242836]', 'border-none', 'rounded-2xl', 'cursor-pointer', 'hover:bg-[#2a2f3e]', 'transition-colors')
  })

  // Test: Kiểm tra format giá đúng cách sử dụng formatPrice utility
  // Mục đích: Đảm bảo giá được format đúng theo định dạng tiền tệ
  it('formats price correctly using formatPrice utility', () => {
    render(<MenuItemCard {...mockProps} />)
    
    expect(screen.getByText('$25000.00')).toBeInTheDocument()
  })

  // Test: Kiểm tra responsive design classes
  // Mục đích: Đảm bảo text có responsive sizing đúng
  it('applies responsive design classes', () => {
    render(<MenuItemCard {...mockProps} />)
    
    const nameElement = screen.getByText('Cà phê đen')
    expect(nameElement).toHaveClass('text-sm', 'sm:text-base')
    
    const priceElement = screen.getByText('$25000.00')
    expect(priceElement).toHaveClass('text-sm', 'sm:text-base')
  })

  // Test: Kiểm tra xử lý click events đúng cách
  // Mục đích: Đảm bảo click handler hoạt động đúng và không bị duplicate calls
  it('handles click events properly', () => {
    render(<MenuItemCard {...mockProps} />)
    
    const card = screen.getByText('Cà phê đen').closest('div')?.parentElement
    fireEvent.click(card!)
    
    expect(mockProps.onClick).toHaveBeenCalledTimes(1)
    expect(mockProps.onClick).toHaveBeenCalledWith(mockMenuItem)
  })
})
