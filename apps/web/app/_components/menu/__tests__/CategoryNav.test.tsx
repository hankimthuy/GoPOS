import { render, screen, fireEvent } from '@testing-library/react'
import CategoryNav from '../CategoryNav'

// Mock data cho categories với đầy đủ properties
const mockCategories = [
  { 
    id: '1', 
    name: 'Cà phê', 
    description: 'Các loại cà phê', 
    is_active: true, 
    active: true,
    sort_order: 1,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  { 
    id: '2', 
    name: 'Trà', 
    description: 'Các loại trà', 
    is_active: true, 
    active: false,
    sort_order: 2,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  { 
    id: '3', 
    name: 'Nước ép', 
    description: 'Các loại nước ép', 
    is_active: true, 
    active: false,
    sort_order: 3,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
]

describe('CategoryNav Component', () => {
  const mockProps = {
    categories: mockCategories,
    onCategoryChange: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Test: Kiểm tra hiển thị tất cả categories
  // Mục đích: Đảm bảo tất cả categories được render đúng
  it('renders all categories', () => {
    render(<CategoryNav {...mockProps} />)
    
    expect(screen.getByText('Cà phê')).toBeInTheDocument()
    expect(screen.getByText('Trà')).toBeInTheDocument()
    expect(screen.getByText('Nước ép')).toBeInTheDocument()
  })

  // Test: Kiểm tra style cho category đang active
  // Mục đích: Đảm bảo category active có style khác biệt
  it('applies active styles to active category', () => {
    render(<CategoryNav {...mockProps} />)
    
    const activeButton = screen.getByText('Cà phê')
    expect(activeButton).toHaveClass('bg-[#ea7b69]', 'text-white', 'hover:bg-[#ea7b69]/90')
  })

  // Test: Kiểm tra style cho categories không active
  // Mục đích: Đảm bảo categories inactive có style phù hợp
  it('applies inactive styles to inactive categories', () => {
    render(<CategoryNav {...mockProps} />)
    
    const inactiveButton = screen.getByText('Trà')
    expect(inactiveButton).toHaveClass('bg-transparent', 'border', 'border-[#e4e7eb]', 'text-[#ea7b69]', 'hover:bg-[#ea7b69]/10')
  })

  // Test: Kiểm tra callback khi click category
  // Mục đích: Đảm bảo onCategoryChange được gọi với đúng ID
  it('calls onCategoryChange when category is clicked', () => {
    render(<CategoryNav {...mockProps} />)
    
    const tràButton = screen.getByText('Trà')
    fireEvent.click(tràButton)
    
    expect(mockProps.onCategoryChange).toHaveBeenCalledWith('2')
  })

  // Test: Kiểm tra callback với nhiều categories
  // Mục đích: Đảm bảo mỗi category gọi callback với ID đúng
  it('calls onCategoryChange with correct category ID for each category', () => {
    render(<CategoryNav {...mockProps} />)
    
    const càPhêButton = screen.getByText('Cà phê')
    const nướcÉpButton = screen.getByText('Nước ép')
    
    fireEvent.click(càPhêButton)
    expect(mockProps.onCategoryChange).toHaveBeenCalledWith('1')
    
    fireEvent.click(nướcÉpButton)
    expect(mockProps.onCategoryChange).toHaveBeenCalledWith('3')
  })

  // Test: Kiểm tra CSS classes responsive
  // Mục đích: Đảm bảo layout responsive hoạt động đúng
  it('applies correct CSS classes for responsive design', () => {
    render(<CategoryNav {...mockProps} />)
    
    const container = screen.getByText('Cà phê').closest('div')
    expect(container).toHaveClass('w-full', 'mt-6', 'flex', 'flex-wrap', 'gap-2', 'sm:gap-3')
  })

  // Test: Kiểm tra xử lý danh sách rỗng
  // Mục đích: Đảm bảo component không crash khi không có categories
  it('handles empty categories array', () => {
    const emptyProps = {
      categories: [],
      onCategoryChange: jest.fn(),
    }
    
    render(<CategoryNav {...emptyProps} />)
    
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  // Test: Kiểm tra render categories dưới dạng buttons
  // Mục đích: Đảm bảo categories được render đúng role
  it('renders categories as buttons', () => {
    render(<CategoryNav {...mockProps} />)
    
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)
  })

  // Test: Kiểm tra accessibility của buttons
  // Mục đích: Đảm bảo tất cả buttons đều enabled và accessible
  it('maintains button accessibility', () => {
    render(<CategoryNav {...mockProps} />)
    
    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toBeEnabled()
    })
  })
})
