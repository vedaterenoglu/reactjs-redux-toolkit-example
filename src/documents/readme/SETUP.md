# 📦 Setup Guide

Complete installation and configuration guide for the ReactJS Redux Toolkit Example project.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)
- **Git** (latest version)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/vedaterenoglu/reactjs-redux-toolkit-example.git
cd reactjs-redux-toolkit-example
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including React 19, Redux Toolkit, and development tools.

### 3. Environment Configuration

#### Create Environment Files

```bash
# Development environment
cp .env.example .env.development

# Production environment (optional)
cp .env.example .env.production
```

#### Configure Environment Variables

Edit `.env.development` with your values:

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:3060

# Application URL
VITE_APP_URL=http://localhost:3061

# Clerk Authentication (get from https://clerk.com)
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here

# Stripe Payments (get from https://stripe.com)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
```

### 4. Backend Setup (Optional)

If you need the full backend:

```bash
# Clone the backend repository
git clone https://github.com/vedaterenoglu/portfolio-events-rest-api.git
cd portfolio-events-rest-api

# Install dependencies
npm install

# Set up database
npm run db:migrate
npm run db:seed

# Start backend server
npm run dev
```

The backend will run on `http://localhost:3060`

## 🐳 Docker Setup (Alternative)

### Using Docker Compose

```bash
# Copy Docker environment file
cp .env.docker.example .env.docker

# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f
```

### Docker Configuration

The project includes:
- `Dockerfile` - Multi-stage build for production
- `docker-compose.yml` - Full stack setup with database
- `.dockerignore` - Optimized build context

## 🔧 IDE Setup

### VS Code Extensions

Recommended extensions for the best development experience:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### TypeScript Configuration

The project uses strict TypeScript settings with path aliases:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 🚀 Starting Development

### Run Development Server

```bash
npm run dev
```

The application will be available at:
- Frontend: [http://localhost:3061](http://localhost:3061)
- Storybook: [http://localhost:6006](http://localhost:6006)

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with HMR
npm run storybook    # Start Storybook

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run typecheck    # Check TypeScript types
npm run format       # Format with Prettier
npm run format:check # Check formatting

# Cleaning
npm run clean        # Clean build artifacts
npm run clean:all    # Clean everything and reinstall
```

## 🔐 Authentication Setup

### Clerk Configuration

1. Create account at [clerk.com](https://clerk.com)
2. Create new application
3. Get your publishable key
4. Add to `.env.development`

### Social Login Providers

Configure in Clerk dashboard:
- Google OAuth
- GitHub OAuth
- Email/Password

## 💳 Payment Setup

### Stripe Test Mode

1. Create account at [stripe.com](https://stripe.com)
2. Get test publishable key
3. Add to `.env.development`

### Test Card Numbers

```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
```

## 🌐 Production Setup

### Environment Variables

Required for production:

```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_APP_URL=https://yourdomain.com
VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_clerk_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key
```

### Build for Production

```bash
# Build optimized bundle
npm run build

# Test production build locally
npm run preview
```

## 🚨 Common Issues

### Port Already in Use

```bash
# Change port in vite.config.ts or use different port
npm run dev -- --port 3062
```

### Missing Environment Variables

Ensure all required variables are set in `.env.development`:
- Check console for warnings
- Verify API endpoints are correct

### TypeScript Errors

```bash
# Check for type errors
npm run typecheck

# Auto-fix ESLint issues
npm run lint -- --fix
```

## 📚 Next Steps

- Read [Usage Guide](./USAGE.md) for feature documentation
- Review [Architecture](./ARCHITECTURE.md) for system design
- Check [Contributing Guide](./CONTRIBUTING.md) for development workflow

---

Need help? Open an issue on [GitHub](https://github.com/vedaterenoglu/reactjs-redux-toolkit-example/issues)