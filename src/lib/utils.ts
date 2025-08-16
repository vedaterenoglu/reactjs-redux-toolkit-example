/**
 * Tailwind CSS class name utilities
 * 
 * Provides: Class name merging with conflict resolution
 * Used by: All components requiring dynamic className composition
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
