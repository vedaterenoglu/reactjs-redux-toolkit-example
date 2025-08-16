# 🚀 ReactJS Redux Toolkit Example

> Modern event management platform showcasing Redux Toolkit migration patterns, RTK Query, and enterprise-grade React architecture

[![Live Demo](https://img.shields.io/badge/demo-live-green)](https://reactjs-redux-toolkit-example.demo.vedaterenoglu.com)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://react.dev)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.5.0-purple)](https://redux-toolkit.js.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## ✨ Key Features

- **🏪 Redux Toolkit** - Modern state management with RTK Query for data fetching
- **💳 Stripe Payments** - Secure payment processing with server-side validation
- **🔐 Authentication** - Complete auth system with Clerk integration
- **🎨 Modern UI** - Tailwind CSS + shadcn/ui component library
- **📱 Responsive** - Mobile-first design with auto-resizing grids
- **🌙 Theme Support** - Dark/light mode with system preference detection
- **⚡ Performance** - Optimized with code splitting and lazy loading
- **🔍 Advanced Search** - Real-time search with debouncing

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/vedaterenoglu/reactjs-redux-toolkit-example.git
cd reactjs-redux-toolkit-example

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.development

# Start development server
npm run dev
```

Visit [http://localhost:3061](http://localhost:3061) to see the app running.

## 📚 Documentation

### Getting Started
- **[Setup Guide](src/documents/readme/SETUP.md)** - Complete installation and configuration
- **[Usage Examples](src/documents/readme/USAGE.md)** - Common tasks and features
- **[Development](src/documents/readme/CONTRIBUTING.md)** - Contributing guidelines

### Technical Documentation
- **[Architecture](src/documents/readme/ARCHITECTURE.md)** - System design and patterns
- **[API Reference](src/documents/readme/API.md)** - API integration guide
- **[State Management](src/documents/readme/STATE_MANAGEMENT.md)** - Redux Toolkit patterns

### Deployment & Operations
- **[Deployment](src/documents/readme/DEPLOYMENT.md)** - Production deployment guide
- **[Troubleshooting](src/documents/readme/TROUBLESHOOTING.md)** - Common issues and solutions

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19, TypeScript, Vite |
| **State** | Redux Toolkit, RTK Query, Redux Persist |
| **Styling** | Tailwind CSS 4, shadcn/ui, Radix UI |
| **Auth** | Clerk Authentication |
| **Payments** | Stripe Integration |
| **Forms** | React Hook Form, Zod |
| **Quality** | ESLint, Prettier, Storybook |

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── lib/           # Utilities and hooks
├── routes/        # Page components
├── services/      # API services
├── store/         # Redux Toolkit store
│   ├── api/       # RTK Query API slice
│   └── slices/    # Feature slices
└── mock/          # Development data
```

## 🎯 Key Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
npm run typecheck   # Check TypeScript
npm run storybook   # Open Storybook
```

## 🔄 Redux Toolkit Migration

This project demonstrates modern Redux patterns:

- **createSlice** - Reduced boilerplate for actions and reducers
- **RTK Query** - Built-in data fetching and caching
- **createAsyncThunk** - Simplified async logic
- **Redux DevTools** - Enhanced debugging experience

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](src/documents/readme/CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Vedat Erenoglu**
- Email: info@vedaterenoglu.com
- Website: [vedaterenoglu.com](https://vedaterenoglu.com)
- LinkedIn: [vedaterenoglu](https://www.linkedin.com/in/vedaterenoglu/)

---

<p align="center">
  Built with ❤️ using React, Redux Toolkit, and TypeScript
</p>