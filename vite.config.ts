import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: {
    port: 3061,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core (separate from router)
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/')) {
            return 'vendor-react'
          }
          // React Router separate chunk
          if (id.includes('node_modules/react-router-dom/') ||
              id.includes('node_modules/react-router/') ||
              id.includes('node_modules/@remix-run/')) {
            return 'vendor-react-router'
          }
          // Redux and RTK
          if (id.includes('node_modules/@reduxjs/toolkit/') && 
              !id.includes('/query')) {
            return 'vendor-redux'
          }
          // RTK Query
          if (id.includes('node_modules/@reduxjs/toolkit/') && 
              id.includes('/query')) {
            return 'vendor-rtk-query'
          }
          // Redux persist
          if (id.includes('node_modules/redux-persist/') ||
              id.includes('node_modules/react-redux/')) {
            return 'vendor-redux-persist'
          }
          // Clerk
          if (id.includes('node_modules/@clerk/')) {
            return 'vendor-clerk'
          }
          // Radix UI
          if (id.includes('node_modules/@radix-ui/')) {
            return 'vendor-radix'
          }
          // UI utilities
          if (id.includes('node_modules/lucide-react/') || 
              id.includes('node_modules/clsx/') || 
              id.includes('node_modules/tailwind-merge/') || 
              id.includes('node_modules/class-variance-authority/')) {
            return 'vendor-ui'
          }
          // Forms
          if (id.includes('node_modules/react-hook-form/') || 
              id.includes('node_modules/zod/')) {
            return 'vendor-forms'
          }
          // Animation
          if (id.includes('node_modules/tw-animate-css/')) {
            return 'vendor-animation'
          }
          // Utils
          if (id.includes('node_modules/reselect/')) {
            return 'vendor-utils'
          }
          // Split application code by feature
          if (id.includes('/src/components/')) {
            return 'app-components'
          }
          if (id.includes('/src/store/')) {
            return 'app-store'
          }
          if (id.includes('/src/services/')) {
            return 'app-services'
          }
          if (id.includes('/src/lib/')) {
            return 'app-lib'
          }
        },
      },
    },
    chunkSizeWarningLimit: 200, // Warn if chunks exceed 200kb
  },
})
