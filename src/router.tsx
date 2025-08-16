/**
 * Application routing configuration with lazy loading and code splitting
 * 
 * Features:
 * - Route-level code splitting for optimal bundle sizes
 * - Protected route authentication via Clerk
 * - Nested routing with shared layout
 * - Payment flow routes (success/cancel pages)
 * 
 * Architecture:
 * - Patterns: Lazy loading for performance optimization
 * - Route protection through component composition
 */

import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { ProtectedRoute } from '@/components/auth'

import { Layout } from './Layout'

// Lazy load routes for code splitting
const HomePage = lazy(() =>
  import('@/routes').then(module => ({ default: module.HomePage }))
)
const Authenticated = lazy(() =>
  import('@/routes').then(module => ({ default: module.Authenticated }))
)
const EventsListPage = lazy(() =>
  import('@/routes').then(module => ({ default: module.EventsListPage }))
)
const SingleEventPage = lazy(() =>
  import('@/routes').then(module => ({ default: module.SingleEventPage }))
)
const PaymentSuccessPage = lazy(() =>
  import('@/routes').then(module => ({ default: module.PaymentSuccessPage }))
)
const PaymentCancelPage = lazy(() =>
  import('@/routes').then(module => ({ default: module.PaymentCancelPage }))
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            }
          >
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'authenticated',
        element: (
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            }
          >
            <ProtectedRoute>
              <Authenticated />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: 'events',
        element: (
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            }
          >
            <EventsListPage />
          </Suspense>
        ),
      },
      {
        path: 'events/:slug',
        element: (
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            }
          >
            <SingleEventPage />
          </Suspense>
        ),
      },
      {
        path: 'events/:slug/payment-success',
        element: (
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            }
          >
            <PaymentSuccessPage />
          </Suspense>
        ),
      },
      {
        path: 'events/:slug/payment-cancel',
        element: (
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            }
          >
            <PaymentCancelPage />
          </Suspense>
        ),
      },
    ],
  },
])
