# Nuxt Dashboard Starter

A modern Nuxt.js dashboard starter template with monolithic architecture, built-in authentication, form validation, and data table management.

## Tech Stack

- **Framework:** Nuxt 3
- **UI Components:** 
  - Shadcn-Vue
  - Reka UI
  - Lucide Icons
- **Styling:** 
  - TailwindCSS
  - Class Variance Authority
- **Database:**
  - Prisma ORM
  - SQLite (can be easily switched to PostgreSQL/MySQL)
- **Authentication:**
  - JWT (jsonwebtoken)
  - HTTP-only cookies
- **Form & Validation:**
  - Vee-validate
  - Zod schema validation
- **Data Table:**
  - TanStack Table (Vue)
  - Built-in search & pagination
- **Others:**
  - TypeScript
  - Vue Sonner (toast notifications)
  - VueUse (composition utilities)

## Features

- 🔐 Authentication with JWT
- 📊 Data Tables with Search & Pagination
- 📝 Form Validation using Zod Schemas
- 🎨 Beautiful UI with Shadcn-Vue
- 🗄️ Database Integration with Prisma
- 🔍 Type-safe APIs
- 📱 Responsive Layout

## Project Structure

```
nuxt-dashboard/
├── components/           # Reusable Vue components
│   ├── ui/              # Shadcn-Vue UI components
│   └── user/            # User-related components
├── composables/         # Vue composables (useAuth, etc)
├── layouts/             # Page layouts
├── middleware/          # Nuxt middleware (auth, etc)
├── pages/              # Application pages
├── prisma/             # Database schema and migrations 
├── public/             # Static files
├── server/             # API routes and server utilities
│   └── api/            # API endpoints
└── types/              # TypeScript type definitions
```

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd nuxt-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Initialize database and run migrations:
```bash
npx prisma generate
npx prisma migrate dev
```

5. Seed the database (optional):
```bash
npm run seed
```

6. Start development server:
```bash
npm run dev
```

## Usage Examples

### Authentication

The starter comes with built-in JWT authentication:
- Login page with form validation
- Protected routes using middleware
- HTTP-only cookie based token storage

### Data Tables

Ready-to-use data table component with:
- Sorting
- Pagination
- Search functionality
- Row actions (edit/delete)
- TypeScript support

### Form Validation

Forms are implemented using vee-validate and zod:
- Schema-based validation
- Real-time validation
- Custom error messages
- TypeScript integration

## Development

### Adding New Features

1. Create new components in `components/`
2. Add new API routes in `server/api/`
3. Define types in `types/`
4. Add new pages in `pages/`

### Database Changes

1. Modify schema in `prisma/schema.prisma`
2. Run migrations:
```bash
npx prisma migrate dev
```

## Production

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## License

MIT

---

This starter template is designed to help you quickly bootstrap admin dashboards and web applications. It comes with all the necessary tooling and pre-built components to save development time while maintaining best practices.