/**
 * Utility functions - Common utility functions for the application
 * Contains cn function for merging Tailwind CSS classes
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
