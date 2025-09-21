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

  // Test: Kiểm tra render title và date đúng cách
  // Mục đích: Đảm bảo header hiển thị title và date chính xác
  it('renders title and date correctly', () => {
    render(<Header {...mockProps} />)
    
    expect(screen.getByText('Go POS')).toBeInTheDocument()
    expect(screen.getByText('Thứ 2, 20/01/2025')).toBeInTheDocument()
  })

  // Test: Kiểm tra render search input với placeholder đúng
  // Mục đích: Đảm bảo search input có placeholder text phù hợp
  it('renders search input with correct placeholder', () => {
    render(<Header {...mockProps} />)
    
    const searchInput = screen.getByPlaceholderText('Tìm kiếm đồ uống...')
    expect(searchInput).toBeInTheDocument()
  })

  // Test: Kiểm tra gọi onSearch khi user nhập vào search input
  // Mục đích: Đảm bảo search callback được gọi đúng khi user nhập liệu
  it('calls onSearch when user types in search input', () => {
    render(<Header {...mockProps} />)
    
    const searchInput = screen.getByPlaceholderText('Tìm kiếm đồ uống...')
    fireEvent.change(searchInput, { target: { value: 'cà phê' } })
    
    expect(mockProps.onSearch).toHaveBeenCalledWith('cà phê')
  })

  // Test: Kiểm tra gọi onSearch nhiều lần khi user nhập
  // Mục đích: Đảm bảo search callback được gọi cho mỗi keystroke
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

  // Test: Kiểm tra render search icon
  // Mục đích: Đảm bảo search icon được hiển thị trong header
  it('renders search icon', () => {
    render(<Header {...mockProps} />)
    
    expect(screen.getByTestId('search-icon')).toBeInTheDocument()
  })

  // Test: Kiểm tra CSS classes cho responsive design
  // Mục đích: Đảm bảo header có responsive styling đúng
  it('applies correct CSS classes for responsive design', () => {
    render(<Header {...mockProps} />)
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('w-full', 'relative', 'mt-6', 'bg-transparent')
    
    const title = screen.getByText('Go POS')
    expect(title).toHaveClass('font-extrabold', 'text-white', 'text-xl', 'sm:text-2xl', 'lg:text-3xl')
  })

  // Test: Kiểm tra xử lý search input rỗng
  // Mục đích: Đảm bảo search callback được gọi với empty string khi clear input
  it('handles empty search input', () => {
    render(<Header {...mockProps} />)
    
    const searchInput = screen.getByPlaceholderText('Tìm kiếm đồ uống...')
    fireEvent.change(searchInput, { target: { value: 'test' } })
    fireEvent.change(searchInput, { target: { value: '' } })
    
    expect(mockProps.onSearch).toHaveBeenCalledWith('')
  })
})
