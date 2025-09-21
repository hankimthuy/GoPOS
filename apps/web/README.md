# 🍵 GoPOS - Point of Sale System

Hệ thống quản lý bán hàng hiện đại cho quán cà phê, được xây dựng với Next.js và TypeScript.

## 🚀 Quick Start

```bash
# Từ root directory (go-pos/)
# Cài đặt tất cả dependencies cho monorepo
npm install

# Chạy development server cho frontend
npm run dev

# Hoặc chạy từ frontend directory
cd apps/web
npm run dev

# Chạy tests cho frontend
npm run test

# Chạy tests cho tất cả packages
npm run test:all
```

## 📚 Documentation

Tất cả tài liệu hướng dẫn được tổ chức trong thư mục `docs/`:

- **[📖 Documentation Index](./docs/INDEX.md)** - Tổng quan tài liệu
- **[🧪 Testing Guide](./docs/testing/TESTING_GUIDE.md)** - Hướng dẫn unit testing
- **[💻 Development Guide](./docs/development/README.md)** - Hướng dẫn phát triển
- **[🏗️ Architecture](./docs/architecture/README.md)** - Kiến trúc hệ thống
- **[🚀 Deployment](./docs/deployment/README.md)** - Hướng dẫn deploy

## 🛠️ Tech Stack

### Frontend (`apps/web/`)
- **Framework**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest, React Testing Library
- **Deployment**: Vercel

### Backend (`packages/database/`)
- **Database**: Supabase (PostgreSQL)
- **ORM**: Supabase Client
- **Types**: TypeScript
- **API**: Supabase REST/GraphQL

### Shared (`packages/shared/`)
- **Utilities**: TypeScript utilities
- **Constants**: Shared constants
- **Types**: Common type definitions

### Monorepo
- **Build System**: Turborepo
- **Package Manager**: npm
- **Workspace**: npm workspaces

## 📁 Project Structure (Monorepo)

```
go-pos/
├── apps/
│   └── web/                      # 🌐 FRONTEND (Next.js)
├── packages/
│   ├── database/                 # 🗄️ BACKEND (Database layer)
│   └── shared/                   # 🔄 SHARED (Common utilities)
├── turbo.json                    # Monorepo config
└── package.json                  # Root dependencies
```

### 🎯 Architecture Overview

- **Frontend**: `apps/web/` - Next.js application
- **Backend**: `packages/database/` - Database layer & API
- **Shared**: `packages/shared/` - Common utilities
- **Monorepo**: Managed by Turborepo for efficient builds

### 🏗️ Monorepo Benefits

- **Code Sharing**: Shared utilities và types giữa frontend/backend
- **Consistent Dependencies**: Quản lý versions đồng bộ
- **Atomic Changes**: Thay đổi cross-package trong 1 commit
- **Efficient Builds**: Turborepo cache và parallel builds
- **Unified Testing**: Chạy tests cho tất cả packages cùng lúc

## 🧪 Testing

Dự án có 161 unit tests với coverage đầy đủ:

```bash
# Chạy tất cả tests
npm run test

# Chạy tests với coverage
npm run test -- --coverage

# Chạy tests với watch mode
npm run test -- --watch
```

## 📖 Learning Resources

- [Testing Guide](./docs/testing/TESTING_GUIDE.md) - Hướng dẫn chi tiết về unit testing
- [Component Examples](./app/_components/) - Xem code examples
- [Test Examples](./app/_components/*/__tests__/) - Xem test examples

## 🤝 Contributing

1. Đọc [Development Guide](./docs/development/README.md)
2. Follow [Coding Standards](./docs/development/README.md)
3. Viết tests cho code mới
4. Tạo Pull Request

## 📝 License

MIT License - xem file LICENSE để biết thêm chi tiết.
