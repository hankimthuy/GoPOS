# GoPOS - Point of Sale System

A modern, responsive Point of Sale (POS) system built with Next.js 14, TypeScript, and Supabase.

## 🏗️ Monorepo Structure

```
go-pos/
├── apps/
│   └── web/                 # Next.js web application
├── packages/
│   ├── database/           # Database types, queries, and Supabase client
│   └── shared/             # Shared utilities and constants
├── package.json            # Root package.json with workspaces
└── turbo.json             # Turbo configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd go-pos
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp apps/web/env.example apps/web/.env.local
```

4. Configure Supabase:
   - Create a new Supabase project
   - Run the SQL schema from `packages/database/schema.sql`
   - Update `.env.local` with your Supabase credentials

5. Start the development server:
```bash
npm run dev
```

## 📦 Packages

### `@go-pos/web`
The main Next.js application containing:
- UI components
- Pages and layouts
- Client-side logic

### `@go-pos/database`
Database layer containing:
- TypeScript types for database entities
- Supabase client configuration
- Database query functions

### `@go-pos/shared`
Shared utilities containing:
- Common utility functions
- Application constants
- Shared types

## 🗄️ Database Schema

The application uses the following main entities:
- **Categories**: Menu categories (Coffee, Tea, etc.)
- **Menu Items**: Individual menu items with prices and descriptions
- **Orders**: Customer orders with status tracking
- **Order Items**: Individual items within an order

## 🎯 Features

### ✅ Implemented
- [x] Responsive design for mobile, tablet, and desktop
- [x] Menu display with categories
- [x] Real-time data from Supabase
- [x] Search functionality
- [x] Category filtering
- [x] Loading states and error handling

### 🚧 In Progress
- [ ] Order management
- [ ] Payment processing
- [ ] Inventory management
- [ ] Reports and analytics

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run clean` - Clean build artifacts

### Adding New Features

1. Create new components in `apps/web/app/_components/`
2. Add database queries in `packages/database/src/queries.ts`
3. Update types in `packages/database/src/types.ts`
4. Add utilities in `packages/shared/src/utils.ts`

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🔧 Technology Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **State Management**: React Hooks
- **Build Tool**: Turbo (Monorepo)
- **UI Components**: Radix UI, Lucide React

## 📄 License

This project is private and proprietary.