/**
 * Clerk authentication provider wrapper with environment configuration
 * 
 * Provides: Authentication context for entire application
 * Used by: App.tsx as top-level provider
 * 
 * Features: Environment key validation, error handling for missing configuration
 */

import { ClerkProvider as ClerkReactProvider } from '@clerk/clerk-react'
import { type ReactNode } from 'react'

interface ClerkProviderProps {
  children: ReactNode
}

const publishableKey = import.meta.env['VITE_CLERK_PUBLISHABLE_KEY']

if (!publishableKey) {
  throw new Error(
    'Missing Clerk Publishable Key. Please add VITE_CLERK_PUBLISHABLE_KEY to your .env file.'
  )
}

export function ClerkProvider({ children }: ClerkProviderProps) {
  return (
    <ClerkReactProvider publishableKey={publishableKey}>
      {children}
    </ClerkReactProvider>
  )
}
