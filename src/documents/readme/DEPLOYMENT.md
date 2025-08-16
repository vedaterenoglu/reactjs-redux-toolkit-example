# 🚀 Deployment Guide

Complete guide for deploying the ReactJS Redux Toolkit Example application to production.

## Deployment Options

### Vercel (Recommended)

#### Automatic Deployment

1. **Connect Repository**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

2. **Configure Environment Variables**

In Vercel Dashboard:
```
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_APP_URL=https://yourdomain.com
VITE_CLERK_PUBLISHABLE_KEY=pk_live_xxx
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
```

3. **vercel.json Configuration**

Already configured in project:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

#### Manual Deployment

```bash
# Build locally
npm run build

# Deploy dist folder
vercel --prod ./dist
```

### Netlify

#### Deploy with CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

#### netlify.toml Configuration

Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### Docker Deployment

#### Build Docker Image

```bash
# Build image
docker build -t redux-toolkit-app .

# Run container
docker run -p 80:80 \
  -e VITE_API_BASE_URL=https://api.yourdomain.com \
  -e VITE_APP_URL=https://yourdomain.com \
  redux-toolkit-app
```

#### Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "80:80"
    environment:
      - VITE_API_BASE_URL=${VITE_API_BASE_URL}
      - VITE_APP_URL=${VITE_APP_URL}
      - VITE_CLERK_PUBLISHABLE_KEY=${VITE_CLERK_PUBLISHABLE_KEY}
      - VITE_STRIPE_PUBLISHABLE_KEY=${VITE_STRIPE_PUBLISHABLE_KEY}
```

### AWS S3 + CloudFront

#### S3 Bucket Setup

```bash
# Create S3 bucket
aws s3 mb s3://your-app-bucket

# Enable static website hosting
aws s3 website s3://your-app-bucket \
  --index-document index.html \
  --error-document index.html

# Upload build files
aws s3 sync dist/ s3://your-app-bucket \
  --delete \
  --cache-control max-age=31536000,public
```

#### CloudFront Configuration

```json
{
  "CustomErrorResponses": [
    {
      "ErrorCode": 404,
      "ResponseCode": 200,
      "ResponsePagePath": "/index.html"
    }
  ]
}
```

## 🔧 Build Configuration

### Production Build

```bash
# Standard build
npm run build

# With analysis
npm run build -- --analyze

# With source maps
npm run build -- --sourcemap
```

### Build Optimization

#### Vite Configuration

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        }
      }
    },
    chunkSizeWarningLimit: 500,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
```

## 🔐 Environment Management

### Production Environment Variables

Required variables:
```env
# API Configuration
VITE_API_BASE_URL=https://api.production.com

# Application URL
VITE_APP_URL=https://app.production.com

# Authentication (Clerk)
VITE_CLERK_PUBLISHABLE_KEY=pk_live_xxx

# Payments (Stripe)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
```

### Environment Security

```bash
# Never commit .env files
echo ".env*" >> .gitignore

# Use secrets management
vercel env pull .env.production
```

## 📊 Performance Optimization

### Bundle Size Analysis

```bash
# Analyze bundle
npm run build -- --analyze

# Check bundle size
du -sh dist/*
```

### Optimization Techniques

1. **Code Splitting**
```typescript
// Route-level splitting
const HomePage = lazy(() => import('./routes/HomePage'))
```

2. **Tree Shaking**
```typescript
// Import only what you need
import { debounce } from 'lodash-es'
// Not: import _ from 'lodash'
```

3. **Image Optimization**
```typescript
// Use WebP with fallback
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Description" />
</picture>
```

## 🔍 Monitoring

### Error Tracking (Sentry)

```typescript
// main.tsx
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay()
  ],
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.1
})
```

### Analytics (Google Analytics)

```html
<!-- index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## 🚦 CI/CD Pipeline

### GitHub Actions

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Type check
        run: npm run typecheck
        
      - name: Lint
        run: npm run lint
        
      - name: Build
        run: npm run build
        env:
          VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
          VITE_APP_URL: ${{ secrets.VITE_APP_URL }}
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 🔄 Rollback Strategy

### Vercel Rollback

```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

### Git-based Rollback

```bash
# Revert last commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard [commit-hash]
git push --force origin main
```

## 📱 Progressive Web App

### PWA Configuration

```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa'

export default {
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Redux Toolkit Example',
        short_name: 'RTK Example',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
}
```

## 🌐 CDN Configuration

### CloudFlare Setup

```bash
# Headers for static assets
Cache-Control: public, max-age=31536000, immutable

# Headers for index.html
Cache-Control: no-cache, no-store, must-revalidate
```

## 🔒 Security Headers

### Recommended Headers

```nginx
# nginx.conf
add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';";
```

## 📋 Deployment Checklist

Before deploying:

- [ ] Environment variables configured
- [ ] Build successful locally
- [ ] Tests passing
- [ ] TypeScript no errors
- [ ] ESLint no errors
- [ ] Bundle size acceptable
- [ ] Images optimized
- [ ] Security headers configured
- [ ] Error tracking setup
- [ ] Analytics configured
- [ ] SSL certificate valid
- [ ] DNS configured correctly
- [ ] Backup strategy in place
- [ ] Rollback plan ready
- [ ] Monitoring alerts setup

## 🚨 Common Issues

### Build Failures

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Environment Variables Not Loading

```bash
# Verify variables are set
echo $VITE_API_BASE_URL

# Rebuild after setting
npm run build
```

### 404 on Refresh

Ensure SPA rewrite rules are configured for your hosting platform.

---

Need help? Check [Troubleshooting Guide](./TROUBLESHOOTING.md) or contact: info@vedaterenoglu.com