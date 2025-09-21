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
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z',
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

  it('renders menu item information correctly', () => {
    render(<MenuItemCard {...mockProps} />)
    
    expect(screen.getByText('Cà phê đen')).toBeInTheDocument()
    expect(screen.getByText('$25000.00')).toBeInTheDocument()
    expect(screen.getByText('Còn 10 ly')).toBeInTheDocument()
    expect(screen.getByText('Cà phê đen truyền thống')).toBeInTheDocument()
  })

  it('calls onClick when card is clicked', () => {
    render(<MenuItemCard {...mockProps} />)
    
    const card = screen.getByText('Cà phê đen').closest('[role="button"]') || screen.getByText('Cà phê đen').closest('div')
    fireEvent.click(card!)
    
    expect(mockProps.onClick).toHaveBeenCalledWith(mockMenuItem)
  })

  it('renders image when image_url is provided', () => {
    render(<MenuItemCard {...mockProps} />)
    
    const imageElement = screen.getByText('Cà phê đen').closest('div')?.parentElement?.querySelector('div[style*="background-image"]')
    expect(imageElement).toHaveStyle({
      backgroundImage: 'url(https://example.com/coffee.jpg)'
    })
  })

  it('renders without image when image_url is null', () => {
    const propsWithoutImage = {
      item: mockMenuItemWithoutImage,
      onClick: jest.fn(),
    }
    
    render(<MenuItemCard {...propsWithoutImage} />)
    
    const imageElement = screen.getByText('Cà phê đen').closest('div')?.parentElement?.querySelector('div[style*="background-image"]')
    expect(imageElement).toHaveStyle({
      backgroundImage: 'none'
    })
  })

  it('does not render description when description is null', () => {
    const propsWithoutDescription = {
      item: mockMenuItemWithoutDescription,
      onClick: jest.fn(),
    }
    
    render(<MenuItemCard {...propsWithoutDescription} />)
    
    expect(screen.queryByText('Cà phê đen truyền thống')).not.toBeInTheDocument()
  })

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

  it('shows "Có sẵn" when stock_quantity is 0', () => {
    const propsOutOfStock = {
      item: mockMenuItemOutOfStock,
      onClick: jest.fn(),
    }
    
    render(<MenuItemCard {...propsOutOfStock} />)
    
    expect(screen.getByText('Có sẵn')).toBeInTheDocument()
  })

  it('applies correct CSS classes for styling', () => {
    render(<MenuItemCard {...mockProps} />)
    
    const card = screen.getByText('Cà phê đen').closest('div')?.parentElement?.parentElement
    expect(card).toHaveClass('bg-[#242836]', 'border-none', 'rounded-2xl', 'cursor-pointer', 'hover:bg-[#2a2f3e]', 'transition-colors')
  })

  it('formats price correctly using formatPrice utility', () => {
    render(<MenuItemCard {...mockProps} />)
    
    expect(screen.getByText('$25000.00')).toBeInTheDocument()
  })

  it('applies responsive design classes', () => {
    render(<MenuItemCard {...mockProps} />)
    
    const nameElement = screen.getByText('Cà phê đen')
    expect(nameElement).toHaveClass('text-sm', 'sm:text-base')
    
    const priceElement = screen.getByText('$25000.00')
    expect(priceElement).toHaveClass('text-sm', 'sm:text-base')
  })

  it('handles click events properly', () => {
    render(<MenuItemCard {...mockProps} />)
    
    const card = screen.getByText('Cà phê đen').closest('div')?.parentElement
    fireEvent.click(card!)
    
    expect(mockProps.onClick).toHaveBeenCalledTimes(1)
    expect(mockProps.onClick).toHaveBeenCalledWith(mockMenuItem)
  })
})
