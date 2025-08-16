/**
 * Event API service re-export for centralized access
 * 
 * Provides: Single import point for event API operations
 * Used by: Redux thunks, components requiring direct API access
 */

export { eventApiService } from './api/facades/eventApi'
