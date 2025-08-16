# 🔧 Troubleshooting Guide

Common issues and their solutions for the ReactJS Redux Toolkit Example application.

## 🚨 Common Issues

### Installation Issues

#### npm install fails

**Error**: `npm ERR! code ERESOLVE`

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete lock file and node_modules
rm -rf package-lock.json node_modules

# Reinstall
npm install
```

#### Node version mismatch

**Error**: `The engine "node" is incompatible`

**Solution**:
```bash
# Check current version
node --version

# Use nvm to switch versions
nvm install 18
nvm use 18
```

### Development Server Issues

#### Port already in use

**Error**: `Port 3061 is already in use`

**Solution**:
```bash
# Find process using port
lsof -i :3061

# Kill process
kill -9 [PID]

# Or use different port
npm run dev -- --port 3062
```

#### Vite HMR not working

**Solution**:
```typescript
// vite.config.ts
server: {
  hmr: {
    overlay: true,
    protocol: 'ws',
    host: 'localhost'
  }
}
```

### Build Issues

#### Build fails with memory error

**Error**: `JavaScript heap out of memory`

**Solution**:
```bash
# Increase memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

#### TypeScript errors during build

**Solution**:
```bash
# Check TypeScript errors
npm run typecheck

# Fix specific file
npx tsc --noEmit src/problem-file.tsx
```

### Redux Issues

#### State not persisting

**Problem**: Redux state resets on refresh

**Solution**:
```typescript
// Check persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['events', 'cities'] // Ensure slices are listed
}

// Verify PersistGate wrapper
<PersistGate loading={null} persistor={persistor}>
  <App />
</PersistGate>
```

#### RTK Query not caching

**Solution**:
```typescript
// Check cache configuration
getEvents: builder.query({
  query: (params) => ({ url: '/events', params }),
  keepUnusedDataFor: 300, // Ensure cache time is set
  providesTags: ['Event'] // Ensure tags are correct
})
```

#### Actions not dispatching

**Solution**:
```typescript
// Use typed hooks
import { useAppDispatch } from '@/store/hooks'

const dispatch = useAppDispatch() // Not useDispatch()
dispatch(eventActions.setEvents(data))
```

### API Issues

#### CORS errors

**Error**: `Access to fetch at 'http://localhost:3060' from origin 'http://localhost:3061' has been blocked by CORS policy`

**Solution**:

Backend configuration:
```typescript
// Backend CORS setup
app.enableCors({
  origin: ['http://localhost:3061', 'https://yourdomain.com'],
  credentials: true
})
```

Frontend proxy:
```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3060',
      changeOrigin: true
    }
  }
}
```

#### API calls failing

**Debug steps**:
```typescript
// 1. Check environment variable
console.log(import.meta.env.VITE_API_BASE_URL)

// 2. Check network tab in DevTools

// 3. Add error logging
try {
  const response = await fetch(url)
  if (!response.ok) {
    console.error('API Error:', response.status, await response.text())
  }
} catch (error) {
  console.error('Network Error:', error)
}
```

### Authentication Issues

#### Clerk not initializing

**Solution**:
```typescript
// Check publishable key
console.log(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY)

// Verify ClerkProvider setup
<ClerkProvider publishableKey={publishableKey}>
  <App />
</ClerkProvider>
```

#### Protected routes not working

**Solution**:
```typescript
// Ensure auth wrapper
<RequireAuth>
  <ProtectedComponent />
</RequireAuth>

// Check auth hook
const { isSignedIn, isLoaded } = useAuth()
if (!isLoaded) return <Loading />
if (!isSignedIn) return <Navigate to="/login" />
```

### Payment Issues

#### Stripe redirect failing

**Error**: `404 on payment success page`

**Solution**:

1. Check redirect URLs:
```typescript
const successUrl = getAppUrl(`/?payment=success&event=${slug}`)
const cancelUrl = getAppUrl(`/?payment=cancel&event=${slug}`)
```

2. Verify App.tsx redirect handler:
```typescript
useEffect(() => {
  const params = new URLSearchParams(window.location.search)
  const paymentStatus = params.get('payment')
  if (paymentStatus) {
    // Handle redirect
  }
}, [])
```

3. Ensure vercel.json exists:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

#### Test payments not working

**Solution**:
```bash
# Use test keys
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx

# Test card numbers
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
```

### UI/Styling Issues

#### Tailwind styles not applying

**Solution**:
```typescript
// Check tailwind.config.js
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"
]

// Verify imports
import './index.css' // Must include Tailwind directives
```

#### Dark mode not working

**Solution**:
```typescript
// Check ThemeProvider
<ThemeProvider defaultTheme="dark" storageKey="theme">
  <App />
</ThemeProvider>

// Verify class application
document.documentElement.classList.add('dark')
```

### Performance Issues

#### Slow initial load

**Solutions**:

1. Enable code splitting:
```typescript
const HomePage = lazy(() => import('./routes/HomePage'))
```

2. Optimize bundle:
```typescript
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        redux: ['@reduxjs/toolkit', 'react-redux']
      }
    }
  }
}
```

3. Enable compression:
```bash
npm i -D vite-plugin-compression

// vite.config.ts
import compression from 'vite-plugin-compression'
plugins: [compression()]
```

#### Memory leaks

**Detection**:
```typescript
// Use React DevTools Profiler
// Check for:
// - Unmounted components still in memory
// - Event listeners not cleaned up
// - Subscriptions not unsubscribed

// Fix example:
useEffect(() => {
  const subscription = subscribe()
  return () => subscription.unsubscribe() // Cleanup
}, [])
```

### Testing Issues

#### Tests failing with import errors

**Solution**:
```typescript
// jest.config.js or vitest.config.ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src')
  }
}
```

#### Component not rendering in tests

**Solution**:
```typescript
// Wrap with providers
const renderWithProviders = (component) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  )
}
```

### Deployment Issues

#### Environment variables not working in production

**Solution**:

1. Verify in hosting platform (Vercel/Netlify)
2. Rebuild after adding variables
3. Check variable names start with `VITE_`

#### 404 errors on page refresh

**Solution varies by platform**:

Vercel:
```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

Netlify:
```toml
# netlify.toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🔍 Debugging Tips

### Enable Debug Mode

```typescript
// Add to .env.development
VITE_DEBUG=true

// In code
if (import.meta.env.VITE_DEBUG) {
  console.log('Debug info:', data)
}
```

### Redux DevTools

```typescript
// Check state
window.__REDUX_DEVTOOLS_EXTENSION__ && 
  window.__REDUX_DEVTOOLS_EXTENSION__()

// Time travel debugging
// Use Redux DevTools browser extension
```

### Network Debugging

```typescript
// Intercept all fetch calls
const originalFetch = window.fetch
window.fetch = async (...args) => {
  console.log('Fetch:', args)
  const response = await originalFetch(...args)
  console.log('Response:', response)
  return response
}
```

## 📞 Getting Help

If you're still stuck:

1. **Check existing issues**: [GitHub Issues](https://github.com/vedaterenoglu/reactjs-redux-toolkit-example/issues)
2. **Search error message**: Often others have encountered the same issue
3. **Create minimal reproduction**: Isolate the problem
4. **Open new issue** with:
   - Error message
   - Steps to reproduce
   - Environment details
   - What you've tried

## 🔄 Quick Fixes

### Reset Everything

```bash
# Nuclear option - reset everything
rm -rf node_modules dist .next .vercel
rm package-lock.json
npm cache clean --force
npm install
npm run dev
```

### Clear All Caches

```bash
# Clear build caches
npm run clean:all

# Clear browser cache
# Chrome: Cmd+Shift+R (Mac) / Ctrl+Shift+R (Windows)

# Clear Redux persist
localStorage.clear()
```

---

Still need help? Contact: info@vedaterenoglu.com or open an issue on [GitHub](https://github.com/vedaterenoglu/reactjs-redux-toolkit-example/issues).