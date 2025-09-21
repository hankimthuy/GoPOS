import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Search: () => <div data-testid="search-icon" />,
  Trash2: () => <div data-testid="trash-icon" />,
  Home: () => <div data-testid="home-icon" />,
  Menu: () => <div data-testid="menu-icon" />,
  ShoppingCart: () => <div data-testid="cart-icon" />,
  Settings: () => <div data-testid="settings-icon" />,
}))

// Mock Supabase
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(),
        })),
      })),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    })),
  })),
}))

// Mock shared utilities
jest.mock('@go-pos/shared', () => ({
  formatPrice: (price) => `$${price.toFixed(2)}`,
}))

// Mock database types
jest.mock('@go-pos/database', () => ({
  Category: {},
  MenuItem: {},
  OrderItem: {},
}))
