import { render, screen, fireEvent } from '@testing-library/react'
import MenuGrid from '../MenuGrid'

const mockMenuItems = [
  {
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
  {
    id: '2',
    name: 'Trà sữa',
    description: 'Trà sữa thơm ngon',
    price: 30000,
    category_id: '2',
    stock_quantity: 5,
    image_url: 'https://example.com/tea.jpg',
    is_available: true,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Nước ép cam',
    description: 'Nước ép cam tươi',
    price: 20000,
    category_id: '3',
    stock_quantity: 8,
    image_url: null,
    is_available: true,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  },
]

describe('MenuGrid Component', () => {
  const mockProps = {
    items: mockMenuItems,
    onItemClick: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all menu items', () => {
    render(<MenuGrid {...mockProps} />)
    
    expect(screen.getByText('Cà phê đen')).toBeInTheDocument()
    expect(screen.getByText('Trà sữa')).toBeInTheDocument()
    expect(screen.getByText('Nước ép cam')).toBeInTheDocument()
  })

  it('renders correct number of menu item cards', () => {
    render(<MenuGrid {...mockProps} />)
    
    // Count only the main item names, not descriptions
    const menuItemNames = screen.getAllByText(/^Cà phê đen$|^Trà sữa$|^Nước ép cam$/)
    expect(menuItemNames).toHaveLength(3)
  })

  it('calls onItemClick when a menu item is clicked', () => {
    render(<MenuGrid {...mockProps} />)
    
    const càPhêCard = screen.getByText('Cà phê đen').closest('div')?.parentElement
    fireEvent.click(càPhêCard!)
    
    expect(mockProps.onItemClick).toHaveBeenCalledWith(mockMenuItems[0])
  })

  it('calls onItemClick with correct item for each menu item', () => {
    render(<MenuGrid {...mockProps} />)
    
    const tràSữaCard = screen.getByText('Trà sữa').closest('div')?.parentElement
    fireEvent.click(tràSữaCard!)
    
    expect(mockProps.onItemClick).toHaveBeenCalledWith(mockMenuItems[1])
    
    const nướcÉpCard = screen.getByText('Nước ép cam').closest('div')?.parentElement
    fireEvent.click(nướcÉpCard!)
    
    expect(mockProps.onItemClick).toHaveBeenCalledWith(mockMenuItems[2])
  })

  it('applies correct CSS classes for grid layout', () => {
    render(<MenuGrid {...mockProps} />)
    
    // Find the actual grid container by looking for the grid class
    const gridContainer = screen.getByText('Cà phê đen').closest('.grid')
    expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4', 'gap-4', 'sm:gap-6')
  })

  it('applies correct CSS classes for container', () => {
    render(<MenuGrid {...mockProps} />)
    
    // Find the container with w-full and mt-6 classes
    const container = screen.getByText('Cà phê đen').closest('.w-full.mt-6')
    expect(container).toHaveClass('w-full', 'mt-6')
  })

  it('handles empty items array', () => {
    const emptyProps = {
      items: [],
      onItemClick: jest.fn(),
    }
    
    render(<MenuGrid {...emptyProps} />)
    
    expect(screen.queryByText('Cà phê đen')).not.toBeInTheDocument()
    expect(screen.queryByText('Trà sữa')).not.toBeInTheDocument()
    expect(screen.queryByText('Nước ép cam')).not.toBeInTheDocument()
  })

  it('renders each item with unique key', () => {
    render(<MenuGrid {...mockProps} />)
    
    // Each MenuItemCard should be rendered with the correct item
    expect(screen.getByText('Cà phê đen')).toBeInTheDocument()
    expect(screen.getByText('Trà sữa')).toBeInTheDocument()
    expect(screen.getByText('Nước ép cam')).toBeInTheDocument()
  })

  it('passes correct props to MenuItemCard components', () => {
    render(<MenuGrid {...mockProps} />)
    
    // Verify that each item is rendered with its correct data
    expect(screen.getByText('$25000.00')).toBeInTheDocument() // Cà phê đen price
    expect(screen.getByText('$30000.00')).toBeInTheDocument() // Trà sữa price
    expect(screen.getByText('$20000.00')).toBeInTheDocument() // Nước ép cam price
  })

  it('maintains responsive grid behavior', () => {
    render(<MenuGrid {...mockProps} />)
    
    const gridContainer = screen.getByText('Cà phê đen').closest('.grid')
    expect(gridContainer).toHaveClass('grid-cols-1') // Mobile: 1 column
    expect(gridContainer).toHaveClass('sm:grid-cols-2') // Small screens: 2 columns
    expect(gridContainer).toHaveClass('lg:grid-cols-3') // Large screens: 3 columns
    expect(gridContainer).toHaveClass('xl:grid-cols-4') // Extra large screens: 4 columns
  })
})
