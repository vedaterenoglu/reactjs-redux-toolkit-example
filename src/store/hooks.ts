/**
 * Type-safe Redux hooks for application-wide state access
 * 
 * Provides: Pre-typed dispatch and selector hooks with full TypeScript inference
 * Used by: All components requiring Redux state access or action dispatching
 */

import { useDispatch, useSelector } from 'react-redux'

import type { RootState, AppDispatch } from './index'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected
) => useSelector(selector)
