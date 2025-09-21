import { render, screen, fireEvent } from '@testing-library/react'
import CategoryNav from '../CategoryNav'

describe('CategoryNav Component', () => {
  const mockCategories = [
    { id: '1', name: 'Cà phê', description: 'Các loại cà phê', is_active: true, active: true },
    { id: '2', name: 'Trà', description: 'Các loại trà', is_active: true, active: false },
    { id: '3', name: 'Nước ép', description: 'Các loại nước ép', is_active: true, active: false },
  ]

  const mockProps = {
    categories: mockCategories,
    onCategoryChange: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders all categories', () => {
    render(<CategoryNav {...mockProps} />)
    
    expect(screen.getByText('Cà phê')).toBeInTheDocument()
    expect(screen.getByText('Trà')).toBeInTheDocument()
    expect(screen.getByText('Nước ép')).toBeInTheDocument()
  })

  it('applies active styles to active category', () => {
    render(<CategoryNav {...mockProps} />)
    
    const activeButton = screen.getByText('Cà phê')
    expect(activeButton).toHaveClass('bg-[#ea7b69]', 'text-white', 'hover:bg-[#ea7b69]/90')
  })

  it('applies inactive styles to inactive categories', () => {
    render(<CategoryNav {...mockProps} />)
    
    const inactiveButton = screen.getByText('Trà')
    expect(inactiveButton).toHaveClass('bg-transparent', 'border', 'border-[#e4e7eb]', 'text-[#ea7b69]', 'hover:bg-[#ea7b69]/10')
  })

  it('calls onCategoryChange when category is clicked', () => {
    render(<CategoryNav {...mockProps} />)
    
    const tràButton = screen.getByText('Trà')
    fireEvent.click(tràButton)
    
    expect(mockProps.onCategoryChange).toHaveBeenCalledWith('2')
  })

  it('calls onCategoryChange with correct category ID for each category', () => {
    render(<CategoryNav {...mockProps} />)
    
    const càPhêButton = screen.getByText('Cà phê')
    const nướcÉpButton = screen.getByText('Nước ép')
    
    fireEvent.click(càPhêButton)
    expect(mockProps.onCategoryChange).toHaveBeenCalledWith('1')
    
    fireEvent.click(nướcÉpButton)
    expect(mockProps.onCategoryChange).toHaveBeenCalledWith('3')
  })

  it('applies correct CSS classes for responsive design', () => {
    render(<CategoryNav {...mockProps} />)
    
    const container = screen.getByText('Cà phê').closest('div')
    expect(container).toHaveClass('w-full', 'mt-6', 'flex', 'flex-wrap', 'gap-2', 'sm:gap-3')
  })

  it('handles empty categories array', () => {
    const emptyProps = {
      categories: [],
      onCategoryChange: jest.fn(),
    }
    
    render(<CategoryNav {...emptyProps} />)
    
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders categories as buttons', () => {
    render(<CategoryNav {...mockProps} />)
    
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)
  })

  it('maintains button accessibility', () => {
    render(<CategoryNav {...mockProps} />)
    
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toBeEnabled()
    })
  })
})
