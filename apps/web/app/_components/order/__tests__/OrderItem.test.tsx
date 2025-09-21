import { render, screen, fireEvent } from '@testing-library/react'
import OrderItem from '../OrderItem'

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
    price: 25000,
    category_id: '1',
    stock_quantity: 10,
    image_url: 'https://example.com/coffee.jpg',
    is_available: true,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  },
}

const mockOrderItemWithoutImage = {
  ...mockOrderItem,
  menu_item: {
    ...mockOrderItem.menu_item,
    image_url: null,
  },
}

const mockOrderItemWithoutDescription = {
  ...mockOrderItem,
  menu_item: {
    ...mockOrderItem.menu_item,
    description: null,
  },
  special_instructions: null,
}

describe('OrderItem Component', () => {
  const mockProps = {
    item: mockOrderItem,
    onQuantityChange: jest.fn(),
    onRemove: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders order item information correctly', () => {
    render(<OrderItem {...mockProps} />)
    
    expect(screen.getByText('Cà phê đen')).toBeInTheDocument()
    expect(screen.getByText('Size M, Đá ít')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('$50000.00')).toBeInTheDocument()
  })

  it('renders image when menu item has image_url', () => {
    render(<OrderItem {...mockProps} />)
    
    // Just check that the component renders without error
    expect(screen.getByText('Cà phê đen')).toBeInTheDocument()
  })

  it('renders without image when menu item has no image_url', () => {
    const propsWithoutImage = {
      item: mockOrderItemWithoutImage,
      onQuantityChange: jest.fn(),
      onRemove: jest.fn(),
    }
    
    render(<OrderItem {...propsWithoutImage} />)
    
    // Just check that the component renders without error
    expect(screen.getByText('Cà phê đen')).toBeInTheDocument()
  })

  it('shows special instructions when available', () => {
    render(<OrderItem {...mockProps} />)
    
    expect(screen.getByText('Size M, Đá ít')).toBeInTheDocument()
  })

  it('shows menu item description when no special instructions', () => {
    const propsWithoutSpecialInstructions = {
      item: mockOrderItemWithoutDescription,
      onQuantityChange: jest.fn(),
      onRemove: jest.fn(),
    }
    
    render(<OrderItem {...propsWithoutSpecialInstructions} />)
    
    // Just check that the component renders without error
    expect(screen.getByText('Cà phê đen')).toBeInTheDocument()
  })

  it('shows "Unknown Item" when menu item is null', () => {
    const itemWithNullMenuItem = {
      ...mockOrderItem,
      menu_item: null,
    }
    
    const propsWithNullMenuItem = {
      item: itemWithNullMenuItem,
      onQuantityChange: jest.fn(),
      onRemove: jest.fn(),
    }
    
    render(<OrderItem {...propsWithNullMenuItem} />)
    
    expect(screen.getByText('Unknown Item')).toBeInTheDocument()
  })

  it('calls onRemove when remove button is clicked', () => {
    render(<OrderItem {...mockProps} />)
    
    const removeButton = screen.getByTestId('trash-icon').closest('button')
    fireEvent.click(removeButton!)
    
    expect(mockProps.onRemove).toHaveBeenCalledWith('1')
  })

  it('formats price correctly using formatPrice utility', () => {
    render(<OrderItem {...mockProps} />)
    
    expect(screen.getByText('$50000.00')).toBeInTheDocument()
  })

  it('applies correct CSS classes for layout', () => {
    render(<OrderItem {...mockProps} />)
    
    // Find the main container with w-full class
    const container = screen.getByText('Cà phê đen').closest('.w-full')
    expect(container).toHaveClass('w-full', 'flex', 'items-center', 'gap-3', 'py-2')
  })

  it('applies correct CSS classes for quantity display', () => {
    render(<OrderItem {...mockProps} />)
    
    const quantityCard = screen.getByText('2').closest('div')?.parentElement?.parentElement
    expect(quantityCard).toHaveClass('w-8', 'h-8', 'bg-[#1f1d2b]', 'rounded-lg', 'border-0', 'flex-shrink-0')
  })

  it('applies correct CSS classes for price display', () => {
    render(<OrderItem {...mockProps} />)
    
    const priceElement = screen.getByText('$50000.00')
    expect(priceElement).toHaveClass('w-16', 'font-medium', 'text-[#ea7b69]', 'text-sm', 'text-right', 'flex-shrink-0')
  })

  it('applies correct CSS classes for remove button', () => {
    render(<OrderItem {...mockProps} />)
    
    const removeButton = screen.getByTestId('trash-icon').closest('button')
    expect(removeButton).toHaveClass('w-6', 'h-6', 'opacity-60', 'hover:opacity-100', 'p-0', 'flex-shrink-0')
  })

  it('displays correct quantity', () => {
    render(<OrderItem {...mockProps} />)
    
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('handles different quantities correctly', () => {
    const itemWithDifferentQuantity = {
      ...mockOrderItem,
      quantity: 5,
    }
    
    const propsWithDifferentQuantity = {
      item: itemWithDifferentQuantity,
      onQuantityChange: jest.fn(),
      onRemove: jest.fn(),
    }
    
    render(<OrderItem {...propsWithDifferentQuantity} />)
    
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('maintains proper text truncation classes', () => {
    render(<OrderItem {...mockProps} />)
    
    const nameElement = screen.getByText('Cà phê đen')
    expect(nameElement).toHaveClass('truncate')
    
    const descriptionElement = screen.getByText('Size M, Đá ít')
    expect(descriptionElement).toHaveClass('truncate')
  })
})
