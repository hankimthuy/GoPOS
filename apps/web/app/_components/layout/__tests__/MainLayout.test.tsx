import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import MainLayout from '../MainLayout'

// Mock the child components
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

// Mock the database queries
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
  })

  it('renders loading state initially', () => {
    render(<MainLayout />)
    
    expect(screen.getByText('Đang tải thực đơn...')).toBeInTheDocument()
  })

  it('renders main layout structure', async () => {
    render(<MainLayout />)
    
    await waitFor(() => {
      expect(screen.getByText('GoPOS Cafe')).toBeInTheDocument()
      expect(screen.getByText('Thứ hai, 20 tháng 11, 2023')).toBeInTheDocument()
      expect(screen.getByText('Chọn Món')).toBeInTheDocument()
    })
  })

  it('loads and displays categories', async () => {
    render(<MainLayout />)
    
    await waitFor(() => {
      expect(screen.getByText('Cà phê')).toBeInTheDocument()
      expect(screen.getByText('Trà')).toBeInTheDocument()
    })
  })

  it('loads and displays menu items', async () => {
    render(<MainLayout />)
    
    await waitFor(() => {
      expect(screen.getByText('Cà phê đen')).toBeInTheDocument()
      expect(screen.getByText('Trà sữa')).toBeInTheDocument()
    })
  })

  it('handles search functionality', async () => {
    render(<MainLayout />)
    
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Tìm kiếm đồ uống...')
      fireEvent.change(searchInput, { target: { value: 'cà phê' } })
    })
    
    await waitFor(() => {
      expect(screen.getByText('Cà phê đen')).toBeInTheDocument()
    })
  })

  it('handles category change', async () => {
    render(<MainLayout />)
    
    await waitFor(() => {
      const tràButton = screen.getByText('Trà')
      fireEvent.click(tràButton)
    })
    
    // Category should be active after click
    await waitFor(() => {
      expect(screen.getByText('Trà')).toBeInTheDocument()
    })
  })

  it('displays error message when data loading fails', async () => {
    const { categoryQueries } = require('@go-pos/database')
    categoryQueries.getActiveCategories.mockRejectedValueOnce(new Error('Network error'))
    
    render(<MainLayout />)
    
    await waitFor(() => {
      expect(screen.getByText('Không thể tải dữ liệu. Vui lòng thử lại.')).toBeInTheDocument()
    })
  })

  it('displays error message when search fails', async () => {
    const { menuItemQueries } = require('@go-pos/database')
    menuItemQueries.searchMenuItems.mockRejectedValueOnce(new Error('Search error'))
    
    render(<MainLayout />)
    
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Tìm kiếm đồ uống...')
      fireEvent.change(searchInput, { target: { value: 'test' } })
    })
    
    await waitFor(() => {
      expect(screen.getByText('Không thể tìm kiếm. Vui lòng thử lại.')).toBeInTheDocument()
    })
  })

  it('renders sidebar with navigation items', async () => {
    render(<MainLayout />)
    
    await waitFor(() => {
      expect(screen.getByTestId('sidebar')).toBeInTheDocument()
      expect(screen.getByText('Trang chủ')).toBeInTheDocument()
      expect(screen.getByText('Sản phẩm')).toBeInTheDocument()
      expect(screen.getByText('Cài đặt')).toBeInTheDocument()
    })
  })

  it('renders order summary section', async () => {
    render(<MainLayout />)
    
    await waitFor(() => {
      expect(screen.getByText('Đơn hàng #34562')).toBeInTheDocument()
    })
  })

  it('applies correct CSS classes for responsive layout', async () => {
    render(<MainLayout />)
    
    await waitFor(() => {
      const mainContainer = screen.getByText('GoPOS Cafe').closest('div')?.parentElement?.parentElement?.parentElement
      expect(mainContainer).toHaveClass('min-h-screen', 'flex', 'flex-col', 'lg:flex-row')
    })
  })
})
