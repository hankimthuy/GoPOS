import { render, screen, fireEvent } from '@testing-library/react'
import Sidebar from '../Sidebar'

// Mock icons để test thay vì dùng icons thật
const MockHome = () => <div data-testid="home-icon" />
const MockMenu = () => <div data-testid="menu-icon" />
const MockCart = () => <div data-testid="cart-icon" />
const MockSettings = () => <div data-testid="settings-icon" />

describe('Sidebar Component', () => {
  const mockNavigationItems = [
    { icon: MockHome, isActive: true, label: 'Trang chủ' },
    { icon: MockMenu, isActive: false, label: 'Menu' },
    { icon: MockCart, isActive: false, label: 'Giỏ hàng' },
    { icon: MockSettings, isActive: false, label: 'Cài đặt' },
  ]

  const mockProps = {
    navigationItems: mockNavigationItems,
    onNavigationChange: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Test: Kiểm tra hiển thị avatar với initials
  // Mục đích: Đảm bảo avatar hiển thị đúng initials "GP"
  it('renders avatar with correct initials', () => {
    render(<Sidebar {...mockProps} />)
    
    expect(screen.getByText('GP')).toBeInTheDocument()
  })

  // Test: Kiểm tra hiển thị tất cả navigation items
  // Mục đích: Đảm bảo tất cả icons navigation được render
  it('renders all navigation items', () => {
    render(<Sidebar {...mockProps} />)
    
    expect(screen.getByTestId('home-icon')).toBeInTheDocument()
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument()
    expect(screen.getByTestId('cart-icon')).toBeInTheDocument()
    expect(screen.getByTestId('settings-icon')).toBeInTheDocument()
  })

  // Test: Kiểm tra style cho navigation item active
  // Mục đích: Đảm bảo item active có style khác biệt
  it('applies active styles to active navigation item', () => {
    render(<Sidebar {...mockProps} />)
    
    const homeButton = screen.getByTestId('home-icon').closest('button')
    expect(homeButton).toHaveClass('bg-[#ea7b69]', 'text-white')
  })

  // Test: Kiểm tra style cho navigation items không active
  // Mục đích: Đảm bảo items inactive có style phù hợp
  it('applies inactive styles to inactive navigation items', () => {
    render(<Sidebar {...mockProps} />)
    
    const menuButton = screen.getByTestId('menu-icon').closest('button')
    expect(menuButton).toHaveClass('text-gray-400', 'hover:text-white', 'hover:bg-gray-700')
  })

  // Test: Kiểm tra callback khi click navigation item
  // Mục đích: Đảm bảo onNavigationChange được gọi với đúng index
  it('calls onNavigationChange when navigation item is clicked', () => {
    render(<Sidebar {...mockProps} />)
    
    const menuButton = screen.getByTestId('menu-icon').closest('button')
    fireEvent.click(menuButton!)
    
    expect(mockProps.onNavigationChange).toHaveBeenCalledWith(1)
  })

  // Test: Kiểm tra callback với nhiều navigation items
  // Mục đích: Đảm bảo mỗi item gọi callback với index đúng
  it('calls onNavigationChange with correct index for each item', () => {
    render(<Sidebar {...mockProps} />)
    
    const homeButton = screen.getByTestId('home-icon').closest('button')
    const cartButton = screen.getByTestId('cart-icon').closest('button')
    const settingsButton = screen.getByTestId('settings-icon').closest('button')
    
    fireEvent.click(homeButton!)
    expect(mockProps.onNavigationChange).toHaveBeenCalledWith(0)
    
    fireEvent.click(cartButton!)
    expect(mockProps.onNavigationChange).toHaveBeenCalledWith(2)
    
    fireEvent.click(settingsButton!)
    expect(mockProps.onNavigationChange).toHaveBeenCalledWith(3)
  })

  // Test: Kiểm tra tooltip titles
  // Mục đích: Đảm bảo tooltip hiển thị đúng text
  it('renders correct tooltip titles', () => {
    render(<Sidebar {...mockProps} />)
    
    const homeButton = screen.getByTestId('home-icon').closest('button')
    const menuButton = screen.getByTestId('menu-icon').closest('button')
    
    expect(homeButton).toHaveAttribute('title', 'Trang chủ')
    expect(menuButton).toHaveAttribute('title', 'Menu')
  })

  // Test: Kiểm tra CSS classes cho layout
  // Mục đích: Đảm bảo sidebar có layout và styling đúng
  it('applies correct CSS classes for layout', () => {
    render(<Sidebar {...mockProps} />)
    
    const sidebar = screen.getByRole('complementary')
    expect(sidebar).toHaveClass('w-20', 'min-h-screen', 'flex', 'flex-col', 'gap-6', 'bg-[#242836]')
  })

  // Test: Kiểm tra xử lý danh sách navigation rỗng
  // Mục đích: Đảm bảo component không crash khi không có navigation items
  it('handles empty navigation items array', () => {
    const emptyProps = {
      navigationItems: [],
      onNavigationChange: jest.fn(),
    }
    
    render(<Sidebar {...emptyProps} />)
    
    expect(screen.getByText('GP')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
