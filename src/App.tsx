/**
 * Root application component with provider composition and payment redirect handling
 * 
 * Responsibilities:
 * - Establishes provider hierarchy (Clerk → Redux → Theme → Router)
 * - Intercepts Stripe payment redirects and routes to appropriate success/cancel pages
 * - Manages application-wide context initialization
 * 
 * Architecture:
 * - Patterns: Provider composition for dependency injection
 * - SOLID: SRP (focused on app initialization and routing)
 */

import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import { ClerkProvider, ReduxProvider } from '@/components/providers'
import { ThemeProvider } from '@/components/theme-provider'

import { router } from './router'

function App() {
  useEffect(() => {
    // Check for payment redirect params from Stripe
    const params = new URLSearchParams(window.location.search)
    const paymentStatus = params.get('payment')
    const eventSlug = params.get('event')
    const sessionId = params.get('session_id')

    if (paymentStatus && eventSlug) {
      // Build the redirect URL
      let redirectUrl = ''
      if (paymentStatus === 'success') {
        redirectUrl = sessionId
          ? `/events/${eventSlug}/payment-success?session_id=${sessionId}`
          : `/events/${eventSlug}/payment-success`
      } else if (paymentStatus === 'cancel') {
        redirectUrl = `/events/${eventSlug}/payment-cancel`
      }

      if (redirectUrl) {
        // Use window.location for redirect to trigger router
        window.location.href = redirectUrl
      }
    }
  }, [])

  return (
    <ClerkProvider>
      <ReduxProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </ReduxProvider>
    </ClerkProvider>
  )
}

export default App
