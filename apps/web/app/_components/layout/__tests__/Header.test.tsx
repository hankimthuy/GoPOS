import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'

describe('Header Component', () => {
  const mockProps = {
    title: 'Go POS',
    date: 'Thứ 2, 20/01/2025',
    onSearch: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders title and date correctly', () => {
    render(<Header {...mockProps} />)
    
    expect(screen.getByText('Go POS')).toBeInTheDocument()
    expect(screen.getByText('Thứ 2, 20/01/2025')).toBeInTheDocument()
  })

  it('renders search input with correct placeholder', () => {
    render(<Header {...mockProps} />)
    
    const searchInput = screen.getByPlaceholderText('Tìm kiếm đồ uống...')
    expect(searchInput).toBeInTheDocument()
  })

  it('calls onSearch when user types in search input', () => {
    render(<Header {...mockProps} />)
    
    const searchInput = screen.getByPlaceholderText('Tìm kiếm đồ uống...')
    fireEvent.change(searchInput, { target: { value: 'cà phê' } })
    
    expect(mockProps.onSearch).toHaveBeenCalledWith('cà phê')
  })

  it('calls onSearch multiple times as user types', () => {
    render(<Header {...mockProps} />)
    
    const searchInput = screen.getByPlaceholderText('Tìm kiếm đồ uống...')
    fireEvent.change(searchInput, { target: { value: 'c' } })
    fireEvent.change(searchInput, { target: { value: 'ca' } })
    fireEvent.change(searchInput, { target: { value: 'caf' } })
    
    expect(mockProps.onSearch).toHaveBeenCalledTimes(3)
    expect(mockProps.onSearch).toHaveBeenNthCalledWith(1, 'c')
    expect(mockProps.onSearch).toHaveBeenNthCalledWith(2, 'ca')
    expect(mockProps.onSearch).toHaveBeenNthCalledWith(3, 'caf')
  })

  it('renders search icon', () => {
    render(<Header {...mockProps} />)
    
    expect(screen.getByTestId('search-icon')).toBeInTheDocument()
  })

  it('applies correct CSS classes for responsive design', () => {
    render(<Header {...mockProps} />)
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('w-full', 'relative', 'mt-6', 'bg-transparent')
    
    const title = screen.getByText('Go POS')
    expect(title).toHaveClass('font-extrabold', 'text-white', 'text-xl', 'sm:text-2xl', 'lg:text-3xl')
  })

  it('handles empty search input', () => {
    render(<Header {...mockProps} />)
    
    const searchInput = screen.getByPlaceholderText('Tìm kiếm đồ uống...')
    fireEvent.change(searchInput, { target: { value: 'test' } })
    fireEvent.change(searchInput, { target: { value: '' } })
    
    expect(mockProps.onSearch).toHaveBeenCalledWith('')
  })
})
