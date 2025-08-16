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
        manualChunks: {
          // Core vendor libraries - explicitly grouped to ensure proper loading order
          'vendor-react': [
            'react',
            'react-dom',
            'react/jsx-runtime'
          ],
          'vendor-react-router': [
            'react-router-dom',
            'react-router'
          ],
          'vendor-redux': [
            '@reduxjs/toolkit',
            'react-redux',
            'redux-persist',
            'reselect'
          ],
          'vendor-rtk-query': [
            '@reduxjs/toolkit/query',
            '@reduxjs/toolkit/query/react'
          ],
          'vendor-clerk': [
            '@clerk/clerk-react',
            '@clerk/shared',
            '@clerk/types'
          ],
          'vendor-radix': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-slot',
            '@radix-ui/react-icons'
          ],
          'vendor-ui': [
            'lucide-react',
            'clsx',
            'tailwind-merge',
            'class-variance-authority'
          ],
          'vendor-forms': [
            'react-hook-form',
            'zod'
          ]
        },
      },
    },
    chunkSizeWarningLimit: 200, // Warn if chunks exceed 200kb
  },
})
