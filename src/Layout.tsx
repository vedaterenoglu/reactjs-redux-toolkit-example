/**
 * Application shell layout with consistent header and footer
 * 
 * Features:
 * - Persistent navigation bar across all routes
 * - Flexible content area via React Router Outlet
 * - Responsive flexbox layout ensuring footer stays at bottom
 * 
 * Used by: Router as parent route wrapper for all pages
 */

import { Outlet } from 'react-router-dom'

import { Footer, Navbar } from '@/components/layout'

export function Layout() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
      <Navbar title={import.meta.env['VITE_APP_NAME'] || 'Online Ticket'} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer author="Vedat Erenoglu" />
    </div>
  )
}
