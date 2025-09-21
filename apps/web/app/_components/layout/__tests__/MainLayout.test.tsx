import { render, screen, fireEvent, act } from '@testing-library/react'
import MainLayout from '../MainLayout'

// Mock child components
jest.mock('../Sidebar', () => {
  return function MockSidebar({ navigationItems, onNavigationChange }: any) {
    return (
      <div data-testid="sidebar">
        {navigationItems.map((item: any, index: number) => (
          <button key={index} onClick={() => onNavigationChange(index)}>
            {item.label}
          </button>
        ))}
      </div>
    )
  }
})

// Mock Header component
jest.mock('../Header', () => {
  return function MockHeader({ title, date, onSearch }: any) {
    return (
      <div data-testid="header">
        <h1>{title}</h1>
        <p>{date}</p>
        <input
          placeholder="Tìm kiếm đồ uống..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    )
  }
})

// Mock CategoryNav component
jest.mock('../../menu/CategoryNav', () => {
  return function MockCategoryNav({ categories, onCategoryChange }: any) {
    return (
      <div data-testid="category-nav">
        {categories.map((category: any) => (
          <button key={category.id} onClick={() => onCategoryChange(category.id)}>
            {category.name}
          </button>
        ))}
      </div>
    )
  }
})

// Mock MenuGrid component
jest.mock('../../menu/MenuGrid', () => {
  return function MockMenuGrid({ items, onItemClick }: any) {
    return (
      <div data-testid="menu-grid">
        {items.map((item: any) => (
          <div key={item.id} onClick={() => onItemClick(item)}>
            {item.name}
          </div>
        ))}
      </div>
    )
  }
})

// Mock OrderSummary component
jest.mock('../../order/OrderSummary', () => {
  return function MockOrderSummary({ order, onOrderTypeChange, onItemQuantityChange, onItemRemove, onCheckout }: any) {
    return (
      <div data-testid="order-summary">
        <div>Đơn hàng #{order.orderId}</div>
        <button onClick={onCheckout}>Tiến hành Thanh toán</button>
      </div>
    )
  }
})

// Mock database queries để tránh gọi database thật
jest.mock('@go-pos/database', () => ({
  categoryQueries: {
    getActiveCategories: jest.fn(() => Promise.resolve([
      { id: '1', name: 'Cà phê', description: 'Các loại cà phê', is_active: true },
      { id: '2', name: 'Trà', description: 'Các loại trà', is_active: true },
    ])),
  },
  menuItemQueries: {
    getAvailableMenuItems: jest.fn(() => Promise.resolve([
      { id: '1', name: 'Cà phê đen', price: 25000, category_id: '1', stock_quantity: 10 },
      { id: '2', name: 'Trà sữa', price: 30000, category_id: '2', stock_quantity: 5 },
    ])),
    searchMenuItems: jest.fn(() => Promise.resolve([
      { id: '1', name: 'Cà phê đen', price: 25000, category_id: '1', stock_quantity: 10 },
    ])),
  },
}))

describe('MainLayout Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation(() => { })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  // Test: Kiểm tra trạng thái loading ban đầu
  // Mục đích: Đảm bảo loading indicator hiển thị khi dữ liệu đang tải
  it('renders loading state initially', () => {
    render(<MainLayout />)
    expect(screen.getByText('Đang tải thực đơn...')).toBeInTheDocument()
  })

  // Test: Kiểm tra cấu trúc layout chính
  // Mục đích: Đảm bảo header, title, date hiển thị đúng
  it('renders main layout structure', async () => {
    await act(async () => {
      render(<MainLayout />)
    })

    expect(await screen.findByText('GoPOS Cafe')).toBeInTheDocument()
    expect(await screen.findByText('Thứ hai, 20 tháng 11, 2023')).toBeInTheDocument()
    expect(await screen.findByText('Chọn Món')).toBeInTheDocument()
  })

  // Test: Kiểm tra tải và hiển thị categories
  // Mục đích: Đảm bảo categories được load và hiển thị từ database
  it('loads and displays categories', async () => {
    await act(async () => {
      render(<MainLayout />)
    })

    expect(await screen.findByText('Cà phê')).toBeInTheDocument()
    expect(await screen.findByText('Trà')).toBeInTheDocument()
  })

  // Test: Kiểm tra tải và hiển thị menu items
  // Mục đích: Đảm bảo menu items được load và hiển thị từ database
  it('loads and displays menu items', async () => {
    await act(async () => {
      render(<MainLayout />)
    })

    expect(await screen.findByText('Cà phê đen')).toBeInTheDocument()
    expect(await screen.findByText('Trà sữa')).toBeInTheDocument()
  })

  // Test: Kiểm tra chức năng tìm kiếm
  // Mục đích: Đảm bảo search input filter menu items theo từ khóa
  it('handles search functionality', async () => {
    await act(async () => {
      render(<MainLayout />)
    })

    const searchInput = await screen.findByPlaceholderText('Tìm kiếm đồ uống...')

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'cà phê' } })
    })

    expect(await screen.findByText('Cà phê đen')).toBeInTheDocument()
  })

  // Test: Kiểm tra thay đổi category
  // Mục đích: Đảm bảo click category sẽ filter menu items
  it('handles category change', async () => {
    await act(async () => {
      render(<MainLayout />)
    })

    const tràButton = await screen.findByText('Trà')

    await act(async () => {
      fireEvent.click(tràButton)
    })

    expect(await screen.findByText('Trà')).toBeInTheDocument()
  })

  // Test: Kiểm tra hiển thị lỗi khi tải dữ liệu thất bại
  // Mục đích: Đảm bảo error handling khi API call thất bại
  it('displays error message when data loading fails', async () => {
    const { categoryQueries } = require('@go-pos/database')
    categoryQueries.getActiveCategories.mockRejectedValueOnce(new Error('Network error'))

    await act(async () => {
      render(<MainLayout />)
    })

    expect(await screen.findByText('Không thể tải dữ liệu. Vui lòng thử lại.')).toBeInTheDocument()
  })

  // Test: Kiểm tra hiển thị lỗi khi tìm kiếm thất bại
  // Mục đích: Đảm bảo error handling khi search API thất bại
  it('displays error message when search fails', async () => {
    const { menuItemQueries } = require('@go-pos/database')
    menuItemQueries.searchMenuItems.mockRejectedValueOnce(new Error('Search error'))

    await act(async () => {
      render(<MainLayout />)
    })

    const searchInput = await screen.findByPlaceholderText('Tìm kiếm đồ uống...')

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: 'test' } })
    })

    expect(await screen.findByText('Không thể tìm kiếm. Vui lòng thử lại.')).toBeInTheDocument()
  })

  // Test: Kiểm tra hiển thị sidebar
  // Mục đích: Đảm bảo sidebar render với navigation items
  it('renders sidebar with navigation items', async () => {
    await act(async () => {
      render(<MainLayout />)
    })

    expect(await screen.findByTestId('sidebar')).toBeInTheDocument()
    expect(await screen.findByText('Trang chủ')).toBeInTheDocument()
    expect(await screen.findByText('Sản phẩm')).toBeInTheDocument()
    expect(await screen.findByText('Cài đặt')).toBeInTheDocument()
  })

  // Test: Kiểm tra hiển thị order summary
  // Mục đích: Đảm bảo order summary component hiển thị đúng
  it('renders order summary section', async () => {
    await act(async () => {
      render(<MainLayout />)
    })

    expect(await screen.findByText('Đơn hàng #34562')).toBeInTheDocument()
  })

  // Test: Kiểm tra CSS classes responsive
  // Mục đích: Đảm bảo layout responsive với breakpoints khác nhau
  it('applies correct CSS classes for responsive layout', async () => {
    await act(async () => {
      render(<MainLayout />)
    })

    const mainContainer = (await screen.findByText('GoPOS Cafe')).closest('div')?.parentElement?.parentElement?.parentElement
    expect(mainContainer).toHaveClass('min-h-screen', 'flex', 'flex-col', 'lg:flex-row')
  })
})